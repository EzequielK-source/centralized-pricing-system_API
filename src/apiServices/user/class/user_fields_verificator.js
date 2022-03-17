const MissingUserField = require('../exceptions/missing_user_fields')

module.exports = class UserFieldsVerificator {
	/**
		* This class Verify if exist all
		* user strict fields

		*@param userFields OBJECT
	**/
	constructor(userFields) {
		if(!userFields.Username) throw new MissingUserField("Username")
		if(!userFields.Password) throw new MissingUserField("Password")
		if(!userFields.Permissions) throw new MissingUserField("Permissions")
	}
}
