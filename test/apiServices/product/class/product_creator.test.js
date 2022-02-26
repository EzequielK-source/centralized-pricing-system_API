//test deps and config
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const {expect, assert} = chai;

//modules
const {validate: uuidValidate} = require('uuid')
//app deps
const ProductCreator = require("src/apiServices/product/class/product_creator")
const ProductDAO = require("src/apiServices/product/class/product_dao")
const MissingProductField = require("src/apiServices/product/exception/missing-product-field")
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
		expect(productCreated)
				.to
				.be
				.deep.equal(productFields);
	});
	describe('Missing any productField throw MissingProductField', () => {
		it('Missing ID_Product not throw', async() => {
			const productFields = {
				name:"productname",
				description:"product description",
				price:1230,
				barcode:"asdasdasd"
			}
			const productCreated = await ProductCreator.create(productFields);
			expect(productCreated)
				.to
				.have
				.property("ID_Product")
				.not
				.be
				.empty;
				
			expect(uuidValidate(productCreated.ID_Product)).to.be.true;
		});
		it('Missing name throw', () => {
			const productFields = {
				ID_Product: 'product_id',
				description:"product description",
				price:1230,
				barcode:"asdasdasd"
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing name field")
		});
		it('Missing description throw', () => {
			const productFields = {
				ID_Product: 'product_id',
				name:"named",
				price:1230,
				barcode:"asdasdasd"
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing description field")
		});
		it('Missing price throw', () => {
			const productFields = {
				ID_Product: 'product_id',
				name:"named",
				description:"product description",
				barcode:"asdasdasd"
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing price field")
		});
		it('Missing barcode throw', () => {
			const productFields = {
				ID_Product: 'product_id',
				name:"named",
				description:"product description",
				price:1230
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing barcode field")
		});
	});
});
