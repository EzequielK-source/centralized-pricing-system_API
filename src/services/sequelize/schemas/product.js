module.exports = (sequelize, DataTypes)=>{
	const Product = sequelize.define("Product",{
		ID_Product:{
			type: DataTypes.UUID,
			primaryKey: true
		},
		Name:{
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			binary: true
		},
		Description:{
			type: DataTypes.STRING,
			allowNull: true
		},
		Price:{
			type: DataTypes.FLOAT,
			allowNull: false
		},
		Barcode:{
			type: DataTypes.STRING,
			allowNull:false,
			unique: true
		},
		LastUpdate:{
			type: DataTypes.DATEONLY,
			default: DataTypes.NOW
		}
	},{
		timestamps: false
	})
	return Product;
}
