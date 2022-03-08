const express = require("express");
const productRouter = express.Router();

const ProductFieldsVerificator = require('./class/product_fields_verificator');
const ProductCreator = require('./class/product_creator');
const ProductFinder = require('./class/product_finder');
const {updateProduct} = require('./controller');
productRouter.route("/")
	.get((req,res)=>{
		return res.sendStatus(200)
	})
	.post(async(req,res)=>{
		res.set('Content-Type', 'application/json');
		try{
			new ProductFieldsVerificator(req.body)
			const {
				Name,
				Price,
				Barcode,Description} = await ProductCreator.create(req.body)
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
			return res.status(400).json({
						status:"Product not modify",
						error:err.name
			})
		}
	})

productRouter.route("/:barcode")
	.put(updateProduct)
	.get(async (req,res)=>{
		res.set('Content-Type', 'application/json');
		try{
			const barcode = req.params.barcode;
			const product = await ProductFinder.findByBarcode(barcode)
			return res.status(200).json(product)
		}catch(err){
			return res.status(400).json(err);
		}
	})
module.exports = productRouter
