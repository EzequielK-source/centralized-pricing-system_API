const UserFieldsVerificator = require('src/apiServices/user/class/user_fields_verificator')
module.exports = class UserCreator {
	static async create(user_fields){
		new UserFieldsVerificator(user_fields)
	}
}
