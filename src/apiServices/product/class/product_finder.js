const {product: ProductModel} = require('src/services/sequelize/index');
const ProductDAO = require('./product_dao');
const UnregisteredBarcode = require('../exception/unregistered-barcode');
module.exports = class ProductFinder {
	static async findByBarcode(Barcode){
		/**
			* Find one product by barcode and return ProductDAO
			* if there is no registered product with
			  the barcode it throws an error
			*@param Barcode STRING
		**/
		const productFindend = await ProductModel.findOne({
			where: {
				Barcode
			}
		})

		if(productFindend == null) throw new UnregisteredBarcode();

		return Promise.resolve(new ProductDAO(productFindend))
	}
}
