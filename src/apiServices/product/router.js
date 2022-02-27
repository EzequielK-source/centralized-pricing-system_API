const express = require("express");
const productRouter = express.Router();

const ProductFieldsVerificator = require('./class/product_fields_verificator');

productRouter.route("/")
	.get((req,res)=>{
		return res.sendStatus(200)
	})
	.post((req,res)=>{
		try{
			new ProductFieldsVerificator(req.body)
		}catch(err){
			return res.sendStatus(400)
		}
	})

module.exports = productRouter
