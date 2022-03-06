const express = require("express");
const productRouter = express.Router();

const ProductFieldsVerificator = require('./class/product_fields_verificator');
const ProductCreator = require('./class/product_creator');
const ProductModifier = require('./class/product_modifier');
const ProductFinder = require('./class/product_finder');

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
			return res.sendStatus(400)
		}
	})

productRouter.route("/:barcode")
	.put(async(req,res)=>{
		try{
			res.set('Content-Type', 'application/json');
			const barcode = req.params.barcode;
			const product_modified = await ProductModifier.modifyByBarcode(
				barcode, req.body
			)

			return res.status(200).json(product_modified);
		}catch(err){
			return res.sendStatus(400)
		}
	})
	.get(async (req,res)=>{
		try{
			res.set('Content-Type', 'application/json');
			const barcode = req.params.barcode;
			const product = await ProductFinder.findByBarcode(barcode)
			return res.status(200).json(product)
		}catch(err){
			return res.status(400).json(err);
		}
	})
module.exports = productRouter
