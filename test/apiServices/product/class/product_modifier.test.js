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

	describe('modify one property', () => {
		let productOne;
		before(async() => {
			/* create two products for modify after */
			productOne = {
				ID_Product: "productOneToModify",
				Name:"product_one",
				Description:"product Description",
				Price:1230,
				Barcode:"zzzzzzzzzzz"
			}
			try{
				await ProductCreator.create(productOne)
			}catch(err){
				console.error(err)
			}
		});

		it('modify Name', async () => {
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
		it('modify Price', async () => {
			const product_modified = await ProductModifier.modify(productOne.ID_Product, {
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
			const product_modified = await ProductModifier.modify(productOne.ID_Product, {
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
				ProductModifier.modify(productOne.ID_Product,{
				ID_Product: "new ID"
				})
			)
			.to
			.eventually
			.be
			.rejected;
		});
		it('try modify Barcode throw error', async () => {
			return expect (
				ProductModifier.modify(productOne.ID_Product,{
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
