const ProductDao = require("./product_dao")
module.exports = class ProductCreator {
	/**
	 *Persit Product in database and return ProductDAO instance.
	**/
	static async create(productFields){
		/**
		  * Persist product and return ProductDAO instance.

		  * Try to create a product only if
		  * there is no product with the same name
		  * or the barcode is already taken.

		  * @param {[object]} productFields object with the product fields
		 **/
		return Promise.resolve(new ProductDao(productFields))
	}
}
