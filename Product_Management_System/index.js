const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

//From the assignment, we can save the new product in the RAM of the server.
const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 1000,
    stock: 5,
  },
  {
    id: 2,
    name: "Mobile",
    category: "Electronics",
    price: 500,
    stock: 10,
  },
];

// GET All products
app.get("/products", (req, res) => {
  res.json(products);
});

//get product by id
app.get("/products/:id", (req, res) => {
  const product = products.find((product) => product.id === parseInt(req.params.id));
  if (product === undefined) {
    res.send("Product not found!");
  } else {
    res.json(product);
  }
});

// add new product
app.post("/products/add", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
  };
  // save the new product in the RAM of the server
  products.push(newProduct);
  res.send("A new product is added successfully.");
});

// Update product details
app.put("/products/:id", (req, res) => {
  const product = products.find((product) => product.id === parseInt(req.params.id));
  if (product === undefined) {
    res.send("Product not found!");
  } else {
    product.name = req.body.name;
    product.price = req.body.price;
    product.stock = req.body.stock;
    res.send("Product updated successfully.");
  }
});

// DELETE product by id
app.delete("/products/:id", (req, res) => {
  const product = products.find((product) => product.id === parseInt(req.params.id));
  if (product === undefined) {
    res.send("Product not found!");
  } else {
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send("Product deleted successfully.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
