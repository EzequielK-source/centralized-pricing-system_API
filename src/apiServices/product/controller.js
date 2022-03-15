const ProductModifier = require("./class/product_modifier");
const ProductFinder = require('./class/product_finder');
const ProductCreator = require("./class/product_creator")
const ProductDeleter = require("./class/product_deleter")
const ProductFieldsVerificator = require('./class/product_fields_verificator');

const productController = {};
productController.updateProduct = async(req,res)=>{
	res.set('Content-Type', 'application/json');
	try{
		const barcode = req.params.barcode;
		const product_modified = await ProductModifier.modifyByBarcode(
			barcode, req.body
		)

		return res.status(200).json(product_modified);
	}catch(err){
		return res.status(400).json({
			status: 'Product not modify',
			error:err.name
		})
	}
}
productController.getProductByBarcode = async(req,res)=>{
	res.set('Content-Type', 'application/json');
	try{
		const barcode = req.params.barcode;
		const product = await ProductFinder.findByBarcode(barcode)
		return res.status(200).json(product)
	}catch(err){
		return res.status(400).json({
			status:'Product not found',
			error: err.name
		});
	}
}
productController.createProduct = async(req,res)=>{
	res.set('Content-Type', 'application/json');
	try{
		new ProductFieldsVerificator(req.body)
		const {
			Name,
			Price,
			Barcode,
			Description} = await ProductCreator.create(req.body);

		return res.status(201).json({
			status:"product created",
			product:{
				Name,
				Price,
				Barcode,
				Description
			}
		});

	}catch(err){
		const error_response = {
			status:'Product not created',
			error: err.name
		}
		if(err.name == 'MissingProductField') error_response.error = err.message;
		return res.status(400).json(error_response)
	}
}

productController.deleteProductByBarcode = async(req,res)=>{
	res.set('Content-Type', 'application/json');
	try{
		const barcode = req.params.barcode
		await ProductDeleter.delete(barcode)
		return res.status(200).json({
			status:"Product deleted"
		});
	}catch(err){
		return res.status(400).json({
			status: "Product not deleted",
			error: err.name
		})
	}
}
module.exports = productController;
