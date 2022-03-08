const ProductModifier = require("./class/product_modifier");
const ProductFinder = require('./class/product_finder');

const updateProduct = async(req,res)=>{
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
const getProductByBarcode = async(req,res)=>{
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
module.exports = {
		 updateProduct,
		 getProductByBarcode
}
