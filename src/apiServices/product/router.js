const express = require("express");
const productRouter = express.Router();

const {
	updateProduct,
	getProductByBarcode,
	createProduct,
	deleteProductByBarcode} = require('./controller');
productRouter.route("/")
	.get((req,res)=>{
		return res.sendStatus(200)
	})
	.post(createProduct)

productRouter.route("/:barcode")
	.put(updateProduct)
	.get(getProductByBarcode)
	.delete(deleteProductByBarcode)
module.exports = productRouter
