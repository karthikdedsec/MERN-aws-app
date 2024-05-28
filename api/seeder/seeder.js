import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js";

const seedProducts = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://karthikkap121:ArXrhXQ8bSKRi3Lp@mern-aws.ejrv0vh.mongodb.net/mern-aws?retryWrites=true&w=majority&appName=mern-aws"
    );

    await Product.deleteMany();
    console.log("Products deleted");

    await Product.insertMany(products);

    console.log("products created");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
