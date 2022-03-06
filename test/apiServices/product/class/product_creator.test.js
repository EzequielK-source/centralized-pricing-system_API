//test deps and config
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const {expect, assert} = chai;
const deleteAllProducts = require("test/utils/delete_all_products")

//modules
const {validate: uuidValidate} = require('uuid')
const { QueryTypes } = require('sequelize');
//app deps
const {sequelize} =require('src/services/sequelize/index');
const ProductCreator = require("src/apiServices/product/class/product_creator")
const ProductDAO = require("src/apiServices/product/class/product_dao")
const MissingProductField = require("src/apiServices/product/exception/missing-product-field")
describe('ProductCreator test', () => {
	before(async() => {
		await deleteAllProducts();
	});
	describe('Missing any productField throw MissingProductField', () => {
		it('Missing ID_Product not throw', async() => {
			const productFields = {
				Name:"productName",
				Description:"product Description",
				Price:1230,
				Barcode:"asdasdasd"
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
		it('Missing Name throw', () => {
			const productFields = {
				Description:"product Description",
				Price:1230,
				Barcode:"asdasdasd"
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing Name field")
		});
		it('Missing Description throw', () => {
			const productFields = {
				Name:"Named",
				Price:1230,
				Barcode:"asdasdasd"
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing Description field")
		});
		it('Missing Price throw', () => {
			const productFields = {
				Name:"Named",
				Description:"product Description",
				Barcode:"asdasdasd"
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing Price field")
		});
		it('Missing Barcode throw', () => {
			const productFields = {
				Name:"Named",
				Description:"product Description",
				Price:1230
			}

			return expect(ProductCreator.create(productFields))
				.to
				.eventually
				.rejectedWith(MissingProductField, "Missing Barcode field")
		});
		before(async()=>{
			await sequelize.query(`DELETE FROM Products`, { type: QueryTypes.DELETE });
		})
	});
	it('ProductCreator.create return ProductDAO', async() => {
		const productFields = {
			Name:"productName",
			Description:"product Description",
			Price:1230,
			Barcode:"asdasdasd"
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
	it('Product has persisted', async () => {
		const productFields = {
			ID_Product: "testing_id",
			Name:"testing_Name",
			Price:123,
			Barcode:"testing_Barcode",
			Description:"testing_Description",
		}
		await ProductCreator.create(productFields);
		const selectQuery = `SELECT * FROM Products WHERE BINARY ID_Product='${productFields.ID_Product}'`
		const product = await sequelize.query(selectQuery, { type: QueryTypes.SELECT });


		expect(product)
			.to
			.have.property('length').equal(1)
	});
	before(async()=>{
		await sequelize.query(`DELETE FROM Products`, { type: QueryTypes.DELETE });
	})
});
