const {product: ProductModel} = require('src/services/sequelize/index');
const ProductFieldsVerificator = require("./product_fields_verificator")
const ProductDAO = require("./product_dao")
module.exports = class ProductModifier {
	static async modify(ID_Product, new_fields){
		/**
			* Search Product by ID, modify then and
			  return ProductDAO

			 *@param ID_Product STRING
			 *@param new_fields OBJECT
	    **/

		const product = await ProductModel.findByPk(ID_Product);

		for(const property in new_fields){
			product[property] = new_fields[property]
		}

		await product.save();
		return Promise.resolve(new ProductDAO(product))
	}
}
