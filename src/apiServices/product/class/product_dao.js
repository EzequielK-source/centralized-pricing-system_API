module.exports = class ProductDAO {
	/**
	  *Class that contains the fields of a Product.
	**/
	constructor(productFields) {
		this.Description = productFields.Description;
		this.ID_Product = productFields.ID_Product;
		this.Barcode = productFields.Barcode;
		this.Price = productFields.Price;
		this.Name = productFields.Name;
	}
}
