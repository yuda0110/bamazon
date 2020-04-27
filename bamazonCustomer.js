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

const showAllProducts = () => {
  connection.query('SELECT item_id, product_name, price FROM products', (err, res) => {
    if (err) {
      throw err;
    }

    for (const product of res) {
      console.log(`${product.item_id}. ${product.product_name} - $${product.price}`);
    }
  })
  connection.end();
}

showAllProducts();