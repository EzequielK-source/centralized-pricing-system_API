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
	describe('modify one property by barcode', () => {
		let productOne;
		before(async() => {
			/* create two products for modify after */
			productOne = {
				ID_Product: "productTwoModifi",
				Name:"product_two",
				Description:"product Description",
				Price:1230,
				Barcode:"asdfghjklasdasd"
			}
			try{
				await ProductCreator.create(productOne)
			}catch(err){
				console.error(err)
			}
		});
		it('modify Name', async () => {
			const product_modified = await ProductModifier.modifyByBarcode(productOne.Barcode, {
				Name: "my name"
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
		it('modify Price', async () => {
			const product_modified = await ProductModifier.modifyByBarcode(productOne.Barcode, {
				Price: 0
			});

			expect(product_modified)
			.to
			.be
			.instanceof(ProductDAO)
			expect(product_modified.Price)
			.to
			.not
			.deep
			.equal(productOne.Price);
		});
		it('modify Description', async () => {
			const product_modified = await ProductModifier.modifyByBarcode(productOne.Barcode, {
				Description: "new Description"
			});

			expect(product_modified)
			.to
			.be
			.instanceof(ProductDAO)
			expect(product_modified.Description)
			.to
			.not
			.deep
			.equal(productOne.Description);
		});
		it('try modify ID_Product throw error', () => {
			return expect (
				ProductModifier.modifyByBarcode(productOne.Barcode,{
					ID_Product: "new ID"
				})
			)
			.to
			.eventually
			.be
			.rejected;
		});
		it('try modify Barcode throw error', () => {
			return expect (
				ProductModifier.modifyByBarcode(productOne.Barcode,{
					Barcode: "new barcode"
				})
			)
			.to
			.eventually
			.be
			.rejected;
		});
	});
});
