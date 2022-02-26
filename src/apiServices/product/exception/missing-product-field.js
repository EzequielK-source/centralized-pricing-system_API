module.exports = class MissingProductField extends Error {
	constructor(missingField) {
		/**
			* A custom Error to throw when MissingProductField.

			* The error message varies depending on the field
			* passed by parameter as name @missingField.
		**/
		super(`Missing ${missingField} field`)
		this.name = 'MissingProductField'
	}
}
