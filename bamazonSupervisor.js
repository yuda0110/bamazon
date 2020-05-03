const inquirer = require('inquirer');
const connection = require('./mysqlConnection');
const { printTable } = require('console-table-printer');


const ViewProductSalesByDepartment = () => {
  let query = 'SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS total_product_sales, SUM(p.product_sales) - d.over_head_costs AS total_profit ';
  query += 'FROM departments AS d LEFT JOIN products AS p ON d.department_id = p.department_id ';
  query += 'GROUP BY d.department_id '
  query += 'ORDER BY d.department_id';

  connection.query(query, (err, res) => {
    if (err) {
      throw err
    }

    printTable(res);

    // for (const row of res) {
    //   console.log(`${row.department_id} | ${row.department_name} | ${row.over_head_costs} | ${row.product_sales} | ${row.total_profit}`)
    // }
  })
  connection.end();
};


const createNewDepartment = () => {
  console.log('Please enter the new department information you would like to create.\n');

  inquirer.prompt([
    {
      name: 'departmentName',
      type: 'input',
      message: 'Department Name: ',
      validate: (input) => {
        if (input.trim().length > 0) {
          return true;
        } else {
          return 'Please enter a department name.'
        }
      }
    },
    {
      name: 'overHeadCosts',
      type: 'input',
      message: 'Over Head Costs: ',
      validate: (input) => {
        if (input.match(/^\d*(.[0-9][0-9])?$/)) {
          return true;
        } else {
          return 'Invalid input for over head costs.'
        }
      }
    }
  ]).then((answers) => {
    const departmentName = answers.departmentName;
    const overHeadCosts = answers.overHeadCosts;

    connection.query(
      'INSERT INTO departments SET ?',
      {
        department_name: departmentName,
        over_head_costs: overHeadCosts
      },
      (err) => {
        if (err) {
          throw err;
        }
        console.log('\nA new department was created successfully!!!\n');
        console.log('------- Created Department Information -------\n');
        console.log(`Department Name: ${departmentName}\nOver Head Costs: $${overHeadCosts}\n`);
        console.log('--------------------------------------\n');
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