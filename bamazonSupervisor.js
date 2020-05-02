const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./mysqlConnection');


const ViewProductSalesByDepartment = () => {
  let query = 'SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS total_product_sales, SUM(p.product_sales) - d.over_head_costs AS total_profit ';
  query += 'FROM departments AS d LEFT JOIN products AS p ON d.department_id = p.department_id ';
  query += 'GROUP BY d.department_id '
  query += 'ORDER BY d.department_id';

  connection.query(query, (err, res) => {
    if (err) {
      throw err
    }

    console.table(res);

    // for (const row of res) {
    //   console.log(`${row.department_id} | ${row.department_name} | ${row.over_head_costs} | ${row.product_sales} | ${row.total_profit}`)
    // }
  })
  connection.end();
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