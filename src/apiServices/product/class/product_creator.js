const {product: ProductModel} = require("src/services/sequelize/index")
const ProductFieldsVerificator = require('./product_fields_verificator');
const IDGenerator = require("src/apiServices/common/id_generator")
const ProductDAO = require("./product_dao")
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
		//If you don't have ID_Product then generate a uuid
		if(!productFields.ID_Product) productFields.ID_Product = IDGenerator.generate()
		//If any productField is missing then throw a MissingProductFIeld
		new ProductFieldsVerificator(productFields)

		// const {ID_Product, Name, Description, Price, Barcode} = productFields
		await ProductModel.create(productFields);
		return Promise.resolve( new ProductDAO(productFields) )
	}
}
