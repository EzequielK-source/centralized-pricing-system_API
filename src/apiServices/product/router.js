const express = require("express");
const productRouter = express.Router();

const ProductFieldsVerificator = require('./class/product_fields_verificator');
const ProductCreator = require('./class/product_creator');
productRouter.route("/")
	.get((req,res)=>{
		return res.sendStatus(200)
	})
	.post(async(req,res)=>{
		try{
			res.set('Content-Type', 'application/json');
			new ProductFieldsVerificator(req.body)
			const {
				Name,
				Price,
				Barcode,
				Description
			} = await ProductCreator.create(req.body)
			return res.status(201).json({
				status:"product created",
				product:{
					Name,
					Price,
					Barcode,
					Description
				}
			})

		}catch(err){
			return res.sendStatus(400)
		}
	})

module.exports = productRouter
