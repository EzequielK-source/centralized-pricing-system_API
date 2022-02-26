const {v4: uuid4} = require("uuid")
module.exports = class IDGenerator {
	/**
		* IDGenerator generate id using uuid
		* IDGenerator works as abstraction layer for uuid
	**/
	static generate(){
		return uuid4();
	}
}
