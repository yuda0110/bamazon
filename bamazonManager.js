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


const viewProductsForSale = () => {

};


const viewLowInventory = () => {

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