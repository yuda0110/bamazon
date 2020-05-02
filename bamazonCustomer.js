const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./mysqlConnection');


// Create the connection information for the sql database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'bamazon'
// });

connection.connect((err) => {
  if (err) {
    throw err;
  }

  console.log('connected!');
  purchaseProduct();
});

const showAllProducts = (res) => {
  console.log('------ List of Products ------');
  for (const product of res) {
    console.log(`${product.item_id}. ${product.product_name} - $${product.price}`);
  }
  console.log('------------------------------\n');
}

const purchaseProduct = () => {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) {
      throw err;
    }

    showAllProducts(res);

    inquirer.prompt([
      {
        name: 'id',
        type: 'number',
        message: 'Please type in the ID of the product you would like to buy.',
        validate: (input) => {
          const idArr = [];
          for (const product of res) {
            idArr.push(product.item_id);
          }
          if (idArr.includes(parseInt(input))) {
            return true;
          } else {
            return 'There is no product which matches the ID you entered. Please type in a different ID.';
          }
        }
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'How many units of the product would you like to buy?',
        validate: (input) => {
          if (isNaN(input) === false) {
            return true;
          } else {
            return 'Please type in only a number.'
          }
        }
      }
    ]).then((answer) => {
      const chosenItemId = parseInt(answer.id);
      const chosenQuantity = parseInt(answer.quantity);
      console.log('Selected ID: ' + chosenItemId);

      let chosenItem;

      for (const product of res) {
        if (product.item_id === chosenItemId) {
          chosenItem = product;
        }
      }

      // Check if your store has enough of the product to meet the customer's request.
      if (chosenItem.stock_quantity < chosenQuantity) {
        console.log('Sorry, there is not enough stock for your order.\n\n');
        purchaseProduct();
      } else {
        connection.query(
          'UPDATE products SET ? WHERE ?',
          [
              {
                stock_quantity: chosenItem.stock_quantity - chosenQuantity,
                product_sales: chosenItem.product_sales + chosenItem.price * chosenQuantity
              },
              {item_id: chosenItemId}
            ],
            (err, res) => {
              if (err) {
                throw err;
              }
              // Once the update goes through, show the customer the total cost of their purchase.
              console.log(`The total cost: $${chosenItem.price * chosenQuantity}`);
              // console.log(`The product sales BEFORE: $${chosenItem.product_sales}`);
              // console.log(`The product sales AFTER: $${chosenItem.product_sales + chosenItem.price * chosenQuantity}`);
            }
          )
      }
      connection.end();
    }).catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log('TtyError: ');
        console.log(error);
      } else {
        // Something else when wrong
        console.log(error);
      }
    });
  })
}
