const ProductModifier = require("./class/product_modifier");
const ProductFinder = require('./class/product_finder');
const ProductCreator = require("./class/product_creator")
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
		console.error(err);
		return res.status(400).json({
					status:"Product not modify",
					error:err.name
		})
	}
}
module.exports = productController;
