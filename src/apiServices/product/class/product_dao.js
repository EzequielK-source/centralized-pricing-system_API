module.exports = class ProductDAO {
	/**
	  *Class that contains the fields of a Product.
	**/
	constructor(productFields) {
		this.description = productFields.description;
		this.ID_Product = productFields.ID_Product;
		this.barcode = productFields.barcode;
		this.price = productFields.price;
		this.name = productFields.name;
	}
}
