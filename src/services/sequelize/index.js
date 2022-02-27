const {Sequelize,DataTypes} = require("sequelize")
const config = require("config")

const {username, password, database, host, dialect }= config.get("cps.DbConfig")

const sequelize = new Sequelize(database, username, password, {
	host,
	dialect
})

const product = require("./schemas/product")(sequelize, DataTypes)
const syncDatabase = async ()=>{
	const forceSync = (process.env.NODE_ENV === 'development')

	await product.sync({force:forceSync})
}
syncDatabase();
module.exports = {
	sequelize,
	product
};
