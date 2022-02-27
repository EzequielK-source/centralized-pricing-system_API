const MissingProductField = require('../exception/missing-product-field');
module.exports = class ProductFieldsVerificator {
	constructor(productFields) {
		if(!productFields.Name) 		throw new MissingProductField('Name');
		if(!productFields.Description) 	throw new MissingProductField('Description');
		if(!productFields.Price) 		throw new MissingProductField('Price');
		if(!productFields.Barcode) 		throw new MissingProductField('Barcode');
	}
}
