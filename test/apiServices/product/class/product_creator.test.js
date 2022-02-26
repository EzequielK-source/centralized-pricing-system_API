//test deps and config
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const {expect, assert} = chai;

//app deps
const ProductCreator = require("src/apiServices/product/class/product_creator")
const ProductDAO = require("src/apiServices/product/class/product_dao")
describe('ProductCreator test', () => {
	it('ProductCreator.create return ProductDAO', () => {
		return expect( ProductCreator.create({
			ID_Product: 'product_id',
			name:"productname",
			description:"product description",
			price:1230,
			barcode:"asdasdasd"
		}) )
			   .to
			   .eventually
			   .be
			   .an.instanceof(ProductDAO)
	});
});
