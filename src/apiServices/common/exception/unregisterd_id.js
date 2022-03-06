module.exports = class UnregisteredID extends Error {
	constructor() {
		/**
			* A custom Error to throw when MissingProductField.

			* The error message varies depending on the field
			* passed by parameter as name @missingField.
		**/
		super(`ID not registered in DB`)
		this.name = 'UnregisteredID'
	}
}
