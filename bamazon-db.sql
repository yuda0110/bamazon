DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
                          item_id INT AUTO_INCREMENT,
                          product_name VARCHAR(100) NOT NULL,
                          department_name VARCHAR(50) NOT NULL,
                          price DECIMAL(10, 2) NOT NULL,
                          stock_quantity INT default 0,
                          product_sales DECIMAL(10, 2) default 0,
                          PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES
('Juicer Machine', 'Home and Kitchen', 54.99, 25, 1374.75),
('Pressure Cooker', 'Home and Kitchen', 79.00, 30, 790),
('Vacuum Cleaner', 'Appliances', 120.50, 10, 723),
('Microwave', 'Appliances', 89.00, 50, 534),
('Shampoo', 'Beauty and Personal Care', 15.50, 85, 558),
('Conditioner', 'Beauty and Personal Care', 18.00, 80, 180),
('Baby Wipes', 'Baby', 17.99, 150, 467.74),
('Dipers', 'Baby', 48.00, 120, 2832.00),
('Headphone', 'Electronics', 120.00, 35, 480),
('Printer', 'Electronics', 250.00, 18, 250);


CREATE TABLE departments (
                             department_id INT AUTO_INCREMENT,
                             department_name VARCHAR(50) NOT NULL,
                             over_head_costs DECIMAL(10, 2) NOT NULL,
                             PRIMARY KEY (department_id)
);


SELECT * FROM products;

SELECT * FROM departments;