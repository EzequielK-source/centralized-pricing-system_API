//test deps and config
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const {expect, assert} = chai;
const deleteAllProducts = require("test/utils/delete_all_products")

//app deps
const ProductDeleter = require('src/apiServices/product/class/product_deleter');
const ProductCreator = require('src/apiServices/product/class/product_creator');
const UnregisteredBarcode = require("src/apiServices/product/exception/unregistered-barcode")
const {product: ProductModel} = require('src/services/sequelize/index');

describe('ProductDeleter test', () => {
	const product_to_delete = {
		Name:"test",
		Description:"test descr",
		Price: 123,
		Barcode:"barcode_example_for_delete"
	}
	before(async()=>{
		await deleteAllProducts();
		await ProductCreator.create(product_to_delete)
	});

	it('try delete unregistered barcode throw error', async() => {
		return expect (ProductDeleter.delete("unregisteredbarcode"))
			.to
			.eventually
			.be
			.rejectedWith(UnregisteredBarcode);
	});
	it('check if the product was removed', async () => {
		/* delete product and try find it for the
		   barcode 
		*/
		await ProductDeleter.delete(product_to_delete.Barcode);
		const find_deleted_product = await ProductModel.findOne({
			where: {
				Barcode: product_to_delete.Barcode
			}
		});
		expect(find_deleted_product)
		.to
		.be
		.null
	});
});
