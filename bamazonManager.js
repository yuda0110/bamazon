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