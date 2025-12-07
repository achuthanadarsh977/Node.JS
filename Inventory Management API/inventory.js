const mongoose = require('mongoose')
const express = require('express')

const Joi = require('joi')

const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/inventory').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))



const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },

    description: { type: String },

    priceHistory: [
      {
        price: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Product =  mongoose.model("Product", productSchema);

// async function createProduct(){
//     const product1 = new Product({
//         name:'Hyundai',
//         category:'Cars',
//         price:3500000,
//         stock:250,
//         description:'Fast Car',
//         priceHistory:{
//             price:25000,
//             date: "2020-10-01"
//         }
//     })

//     await product1.save()

//     console.log(product1)
// }

// createProduct()

async function findProduct(){
    const find = await Product.find()
    console.log(find)
}

findProduct()


// Joi Validation
function validateProduct(find) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        category: Joi.string().required(),
        price: Joi.number().min(0).required(),
        stock: Joi.number().min(0).required()
    });

    return schema.validate(find);
}

exports.Product = Product
exports.validateProduct = validateProduct
