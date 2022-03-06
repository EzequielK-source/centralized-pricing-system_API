const {product} = require("src/services/sequelize/index")
module.exports = async function deleteAllProducts(){
	await product.destroy({
		where: {},
		truncate: true
	})
}
