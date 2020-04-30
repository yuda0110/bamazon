const mysql = require('mysql');
const inquirer = require('inquirer');

// Create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});


const showAllProducts = (res, listName) => {
  console.log(`\n------ List of ${listName} ------\n`);
  for (const product of res) {
    console.log(`${product.item_id}. ${product.product_name} - $${product.price} - ${product.stock_quantity} items`);
  }
  console.log('\n------------------------------\n');
}

const viewProductsForSale = () => {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) {
      throw err;
    }

    showAllProducts(res, 'All Items');
  })
  connection.end();
};


const viewLowInventory = () => {
  connection.query('SELECT * FROM products WHERE stock_quantity < ?', [5], (err, res) => {
    if (err) {
      throw err;
    }

    showAllProducts(res, 'Items Low in Stock');
  })
  connection.end();
};


const addToInventory = () => {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) {
      throw err;
    }

    inquirer
      .prompt([
        {
          name: 'id',
          type: 'integer',
          message: 'Please type in the ID of the item you would like to add more.',
          validate: (input) => {
            const idArr = [];
            for (const product of res) {
              idArr.push(product.item_id);
            }
            if (idArr.includes(parseInt(input))) {
              return true;
            } else {
              return 'There is no item which matches the ID you entered. Please type in a different ID.';
            }
          }
        },
        {
          name: 'quantity',
          type: 'integer',
          message: 'How many more would you like to add?',
          validate: (input) => {
            if (Number.isFinite(Number.parseInt(input)) && input.match(/^[0-9]+$/)) {
              return true;
            } else {
              return 'Please type in only a number.'
            }
          }
        }
      ]).then((answer) => {
        const chosenItemId = parseInt(answer.id);
        const chosenQuantity = parseInt(answer.quantity);

        let chosenItem;

        for (const product of res) {
          if (product.item_id === chosenItemId) {
            chosenItem = product;
          }
        }

        connection.query(
          'UPDATE products SET ? WHERE ?',
          [
            {stock_quantity: chosenItem.stock_quantity + chosenQuantity},
            {item_id: chosenItemId}
          ],
          (err, res) => {
            if (err) {
              throw err;
            }
            console.log('Update successful!!!');
            console.log(`The quantity of ${chosenItem.product_name} (ID: ${chosenItemId}) is updated to ${chosenItem.stock_quantity + chosenQuantity} now.`);
          }
        )
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
};


const addNewProduct = () => {

};


inquirer
  .prompt([
    {
      name: 'func',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View Products for Sale',
          value: viewProductsForSale
        },
        {
          name: 'View Low Inventory',
          value: viewLowInventory
        },
        {
          name: 'Add to Inventory',
          value: addToInventory
        },
        {
          name: 'Add New Product',
          value: addNewProduct
        }
      ]
    }
  ]).then((choice) => {
    choice.func();
  });