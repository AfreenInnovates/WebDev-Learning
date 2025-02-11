# Mongoose Guide

## Introduction

Mongoose is an **ODM (Object Data Modeling) library** for MongoDB and Node.js. It simplifies interactions with MongoDB by allowing developers to define schemas and work with models instead of writing raw database queries.

### Why Use Mongoose?
- It provides a **structured way** to interact with MongoDB.
- Allows defining **schemas** (blueprints) for data.
- Supports **validation, middleware, and query building**.
- Makes working with **MongoDB much easier** in a Node.js environment.

---

## Installing Mongoose

To use Mongoose in your project, install it via npm:

```sh
npm install mongoose
```

Then, import it into your Node.js project:

```js
import mongoose from "mongoose";
```

---

## Defining a Schema

A **schema** defines how a document (a record in MongoDB) should look. Mongoose provides the `Schema` class to structure our data.

```js
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // This field must be provided
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);
```

### Explanation:
- `name`, `price`, and `image` fields are required.
- `{ timestamps: true }` automatically adds `createdAt` and `updatedAt` fields.
- `mongoose.Schema({...})` defines the blueprint for our data.

#### Example Document Stored in MongoDB
```json
{
  "_id": "65f3d6eab37c3f5b2401d678",
  "name": "MacBook Pro",
  "price": 1999,
  "image": "https://example.com/macbook.jpg",
  "createdAt": "2024-02-10T10:30:00.123Z",
  "updatedAt": "2024-02-10T10:30:00.123Z"
}
```

---

## Creating a Model

A **model** is a wrapper around the schema that allows us to interact with the database.

```js
const Product = mongoose.model("Product", productSchema);
```

### Model vs Schema
- **Schema** = Defines the structure of a document.
- **Model** = Provides an interface to interact with the MongoDB collection.

Mongoose automatically creates a **MongoDB collection** named `products` (plural of `Product`).

---

## Using the Model

### Creating a New Product
```js
const newProduct = new Product({
  name: "iPhone 15",
  price: 999,
  image: "https://example.com/iphone15.jpg",
});
await newProduct.save(); // Saves the product in MongoDB
console.log("Product saved:", newProduct);
```

### Fetching All Products
```js
const products = await Product.find();
console.log(products);
```

### Finding a Product by ID
```js
const product = await Product.findById("65f3d6eab37c3f5b2401d678");
console.log(product);
```

### Updating a Product
```js
await Product.findByIdAndUpdate("65f3d6eab37c3f5b2401d678", { price: 899 });
console.log("Product updated!");
```

### Deleting a Product
```js
await Product.findByIdAndDelete("65f3d6eab37c3f5b2401d678");
console.log("Product deleted!");
```

---

## Connecting to MongoDB

To use Mongoose, you need to connect to a MongoDB database.

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### Steps to Use It:
1. **Set up MongoDB Atlas** and get the connection string.
2. **Store it in an `.env` file:**
   ```env
   MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/your-db-name?retryWrites=true&w=majority
   ```
3. **Call `connectDB()` in your `server.js` before starting the server.**
   ```js
   import express from "express";
   import dotenv from "dotenv";
   import connectDB from "./config/db.js";

   dotenv.config();

   connectDB();

   const app = express();
   app.listen(5000, () => console.log("Server running on port 5000"));
   ```

---
