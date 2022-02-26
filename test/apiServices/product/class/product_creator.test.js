//test deps and config
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised")
// chai.use(chaiAsPromised)
const {expect, assert} = chai;

//app deps
const ProductCreator = require("src/apiServices/product/class/product_creator")
const ProductDAO = require("src/apiServices/product/class/product_dao")
describe('ProductCreator test', () => {
	it('ProductCreator.create return ProductDAO', async() => {
		const productFields = {
			ID_Product: 'product_id',
			name:"productname",
			description:"product description",
			price:1230,
			barcode:"asdasdasd"
		}
		const productCreated = await ProductCreator.create(productFields);
		//verify if an ProductDAO intance
		expect(productCreated)
			.to
			.be.instanceof(ProductDAO);
		it('productCreated have same propertys passed for params', () => {
			expect(productCreated)
				.to
				.be
				.deep.equal(productFields);
		});
	});
});
