DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
                          item_id INT AUTO_INCREMENT,
                          product_name VARCHAR(100) NOT NULL,
                          department_id INT NOT NULL,
                          price DECIMAL(10, 2) NOT NULL,
                          stock_quantity INT default 0,
                          product_sales DECIMAL(10, 2) default 0,
                          PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
VALUES
('Juicer Machine', 6, 54.99, 25, 1374.75),
('Pressure Cooker', 6, 79.00, 30, 790),
('Vacuum Cleaner', 1, 120.50, 10, 723),
('Microwave', 1, 89.00, 50, 534),
('Shampoo', 3, 15.50, 85, 558),
('Conditioner', 3, 18.00, 80, 180),
('Baby Wipes', 2, 17.99, 150, 467.74),
('Dipers', 2, 48.00, 120, 2832.00),
('Headphone', 4, 120.00, 35, 480),
('Printer', 4, 250.00, 18, 250);


CREATE TABLE departments (
                             department_id INT AUTO_INCREMENT,
                             department_name VARCHAR(50) NOT NULL,
                             over_head_costs DECIMAL(10, 2) NOT NULL,
                             PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES
('Appliances', 1000),
('Baby', 800),
('Beauty and Personal Care', 500),
('Electronics', 500),
('Grocery', 2000),
('Home and Kitchen', 400),
('Apps and Games', 200),
('Fashion', 2000),
('Sports and Outdoors', 700),
('Tools and Home Improvements', 600);


SELECT * FROM products;

SELECT * FROM departments;