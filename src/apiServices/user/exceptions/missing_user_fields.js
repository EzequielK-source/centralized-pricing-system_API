module.exports = class MissingUserField extends Error {
	constructor(missingField) {
		/**
			* A custom Error to throw when Missing User Field.

			* The error message varies depending on the field
			* passed by parameter as name @missingField.
		**/
		super()
		this.message = `Missing ${missingField} field`
		this.name = 'MissingUserField'
	}
}
