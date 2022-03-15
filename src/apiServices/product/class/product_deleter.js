const {product: ProductModel} = require("src/services/sequelize/index")
const UnregisteredBarcode = require('../exception/unregistered-barcode');
module.exports = class ProductDeleter {
	static async delete(barcode){
		/**
	  		* Find one Product by barcode
			  and delete
			* Throw UnregisteredBarcode when
			  product if null

			* @param barcode STRING 
		**/
		const product = await ProductModel.findOne({
			where:{
				Barcode: barcode
			}
		})
		if(!product) throw new UnregisteredBarcode();
		await product.destroy();
	}
}
