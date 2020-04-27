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

const showAllProducts = (res) => {
  console.log('------ List of Products ------');
  for (const product of res) {
    console.log(`${product.item_id}. ${product.product_name} - $${product.price}`);
  }
  console.log('\n');
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
        type: 'integer',
        message: 'Please select the ID of the product you would like to buy.',
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
      }
    ]).then((answer) => {
      console.log('Selected ID: ' + answer.id);
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
  connection.end();
}

// showAllProducts();
purchaseProduct();