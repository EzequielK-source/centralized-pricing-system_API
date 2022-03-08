const {product: ProductModel} = require('src/services/sequelize/index');
const UnregisteredBarcode = require('../exception/unregistered-barcode');
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
		if(!product) throw new UnregisteredID();
		for(const property in new_fields){
			product[property] = new_fields[property]
		}

		await product.save();
		return Promise.resolve(new ProductDAO(product))
	}
	static async modifyByBarcode(Barcode, new_fields){
		/**
			* Search Product by Barcode and modify then
			* as long as dont try edit ID_Product or
			* Barcode

			*@param Barcode STRING
			*@param new_fields OBJECT

			*@return ProductDAO
		**/
		this.validateNewFields(new_fields)
		const product = await ProductModel.findOne({
			where:{
				Barcode
			}
		});
		if(!product) throw new UnregisteredBarcode();

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
