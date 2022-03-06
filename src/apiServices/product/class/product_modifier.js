const {product: ProductModel} = require('src/services/sequelize/index');
const ProductFieldsVerificator = require("./product_fields_verificator")
const ProductDAO = require("./product_dao")
module.exports = class ProductModifier {
	static async modifyByPK(ID_Product, new_fields){
		/**
			* Search Product by ID and modify then
			  as long as dont try edit ID_Product
			  or barcode

			 *@param ID_Product STRING
			 *@param new_fields OBJECT
	    **/
		this.validateNewFields(new_fields)
		const product = await ProductModel.findByPk(ID_Product);

		for(const property in new_fields){
			product[property] = new_fields[property]
		}

		await product.save();
		return Promise.resolve(new ProductDAO(product))
	}
	static validateNewFields(new_fields){
		if(new_fields.Barcode) throw Error()
		if(new_fields.ID_Product) throw Error()
	}
}
