//const express = require('express'); (old methode of importing express)
//you can re-create path of running in the terminal ( node .\backend\server.js = node run dev )... in the script section of package.json put (dev: "node backend/server.js")
import express from "express"; //in order to make this moder method of importing you need to create a (type:"module") at package.json
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./model/product.model.js";


dotenv.config();

const app = express();
app.use(express.json());//middleWare this let you pass a json file thorugh the req.body

app.post("/api/products", async (req,res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image){
        return res.status(400).json({sucess:false, Message: "Please provide all the fields"});
    }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({sucess:true, data:newProduct});
    }catch(error){
        console.error("Error in creating the product : ", error.Message);
        res.status(500).json({sucess : False, message: "Server error"}); 
    }
});

app.listen(5000,() =>{
    connectDB();
    console.log('server started at  http://localhost:5000/api/products');
});