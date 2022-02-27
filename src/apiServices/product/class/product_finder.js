const {product: ProductModel} = require('src/services/sequelize/index');
const ProductDAO = require('./product_dao');
module.exports = class ProductFinder {
	static async findByBarcode(Barcode){
		/**
			* Find one product by barcode and return ProductDAO
			*@param Barcode STRING
		**/
		const productFindend = await ProductModel.findOne({
			where: {
				Barcode
			}
		})

		return Promise.resolve(new ProductDAO(productFindend))
	}
}
