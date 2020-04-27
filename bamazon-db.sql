DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
	('Juicer Machine', 'Home and Kitchen', 54.99, 25),
    ('Pressure Cooker', 'Home and Kitchen', 79.00, 30),
    ('Vacuum Cleaner', 'Appliances', 120.50, 10),
    ('Microwave', 'Appliances', 89.00, 50),
    ('Shampoo', 'Beauty and Personal Care', 15.50, 85),
    ('Conditioner', 'Beauty and Personal Care', 18.00, 80),
    ('Baby Wipes', 'Baby', 17.99, 150),
    ('Dipers', 'Baby', 48.00, 120),
    ('Headphone', 'Electronics', 120.00, 35),
    ('Printer', 'Electronics', 250.00, 18);


SELECT * FROM products;