const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Database
const connectDB = require("./db");
//Database connection
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Product Model
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
});
const Product = mongoose.model("Product", productSchema);

// GET All products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products === undefined) {
    res.send("No product found in database! Please add a product.");
  } else {
    res.status(200).send(products);
  }
});

//get product by id
app.get("/products/:id", (req, res) => {
  const productID = req.params.id;
  Product.findById(productID, (err, product) => {
    if (err) {
      res.send("Product not found!");
    } else {
      res.status(200).send(product);
    }
  });
});

// add new product to database
app.post("/products/add", (req, res) => {
  const newProduct = new Product({ ...req.body });
  newProduct.save((err, product) => {
    if (err) {
      res.send("Failed to add product!");
    } else {
      res.send("Product added successfully.");
    }
  });
  
});

// Update product details
app.put("/products/:id", (req, res) => {
  const productID = req.params.id;
  Product.updateOne(productID, { ...req.body }, (err, product) => {
    if (err) {
      res.send("Product not found!");
    } else {
      res.send("Product updated successfully.");
    }
  });
});

// DELETE product by id
app.delete("/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      res.send("Product not found!");
    } else {
      res.send("Product deleted successfully.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
