//test deps and config
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const {expect, assert} = chai;

//modules
const {validate: uuidValidate} = require('uuid')
const { QueryTypes } = require('sequelize');
//app deps
const {sequelize} =require('src/services/sequelize/index');
const ProductModifier = require("src/apiServices/product/class/product_modifier")
const ProductCreator = require("src/apiServices/product/class/product_creator")
const ProductDAO = require("src/apiServices/product/class/product_dao")
describe('ProductModifier test', () => {
	const productOne = {
		ID_Product: "productOneToModify",
		Name:"product_one",
		Description:"product Description",
		Price:1230,
		Barcode:"zzzzzzzzzzz"
	}
	const productTwo = {
		ID_Product: "productTwoToModify",
		Name:"product_two",
		Description:"product Description",
		Price:1230,
		Barcode:"xxxxxxxxxxxxxxxx"
	}
	before(async() => {
		/* create two products for modify after */
		try{
			await ProductCreator.create(productOne)
			await ProductCreator.create(productTwo)
		}catch(err){
			console.error(err)
		}
	});
	it('modify Name for productOne', async () => {
		const product_modified = await ProductModifier.modify(productOne.ID_Product, {
			Name: "new name"
		});

		expect(product_modified)
			.to
			.be
			.instanceof(ProductDAO)
		expect(product_modified.Name)
			.to
			.not
			.deep
			.equal(productOne.Name);
	});
});
