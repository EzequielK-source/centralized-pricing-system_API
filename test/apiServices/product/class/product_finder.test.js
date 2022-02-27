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
const ProductCreator = require('src/apiServices/product/class/product_creator');
const ProductFinder = require('src/apiServices/product/class/product_finder');
const ProductDAO = require('src/apiServices/product/class/product_dao');
describe('ProductFinder test', () => {
	const product = {
		ID_Product: "product_test_id",
		Name: "product_test_name",
		Description: "product_test_description",
		Price: 123,
		Barcode: "product_test_barcode",
	}
	before(async()=>{
		/* create one temporal product */
		await ProductCreator.create(product);
	})
	it('Find Product by Barcode', async() => {
		const product_findend = await ProductFinder.findByBarcode(product.Barcode)
		expect(product_findend)
			.to
			.be
			.instanceof(ProductDAO)
		expect(product_findend)
			.to
			.be
			.deep.equal(product)
	});
});
