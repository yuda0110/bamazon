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


const ViewProductSalesByDepartment = () => {

};


const createNewDepartment = () => {

};


inquirer
  .prompt([
    {
      name: 'func',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View Product Sales by Department',
          value: ViewProductSalesByDepartment
        },
        {
          name: 'Create New Department',
          value: createNewDepartment
        }
      ]
    }
  ]).then((choice) => {
  choice.func();
});