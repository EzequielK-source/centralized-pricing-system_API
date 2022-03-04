module.exports = class UnregisteredBarcode extends Error {
	constructor() {
		/**
			* A custom Error to throw when MissingProductField.

			* The error message varies depending on the field
			* passed by parameter as name @missingField.
		**/
		super(`Barcode not registered in a product`)
		this.name = 'UnregisteredBarcode'
	}
}
