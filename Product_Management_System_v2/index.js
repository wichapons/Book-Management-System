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
  if (products === undefined || !products[0]) {
    res.status(200).send("No product found in database! Please add a product.");
  } else {
    res.status(200).send(products);
  }
});

//get product by id
app.get("/products/:id", async (req, res) => {
  const productID = req.params.id;
  await Product.findById(productID)
    .then((product) => {
      if (!product) {
        res.status(200).send("Product not found!");
      } else {
        res.status(200).send(product);
      }
    })
    .catch((err) => res.status(500).send(err));
});

// add new product to database
app.post("/products/add", async (req, res) => {
  const newProduct = new Product({ ...req.body });
  await newProduct.save().then(() => {
    res.status(200).send("Product added successfully.");
  }
  ).catch((err) => {
    res.status(500).send("Failed to add product!");
  });
}
  );

// Update product details
app.put("/products/:id", async (req, res) => {
  const productID = req.params.id;
  try{
    const response = Product.findById(productID);
    if (!response) {
      res.status(200).send("Product not found!");
    } else {
      await Product.findByIdAndUpdate(productID, { ...req.body })
        .then(() => {
          res.status(200).send("Product updated successfully.");
        })
        .catch((err) => res.status(500).send("Product not found!"));
    }
  } catch{
    res.status(500).send("Product not found!");
  }
}
);
  
  
   

// DELETE product by id
app.delete("/products/:id",async (req, res) => {
  const productID = req.params.id;
  await Product.findById(productID)
    .then((product) => {
      if (!product) {
        res.status(200).send("Product not found!");
      } else {
        //delete that productid in mongodb
        Product.findByIdAndDelete(productID)
          .then(() => {
            res.status(200).send("Product deleted successfully.");
          })
          .catch((err) => res.status(500).send("Product not found!"));
      }
    })
    .catch((err) => res.status(500).send(err));
}
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


module.exports = {app, Product}