//test configs
const chai = require('chai')
const ChaiHttp = require('chai-http')
chai.use(ChaiHttp);
const expect = chai.expect;
//app
const app = require("src/app");
const request = chai.request;
const deleteAllProducts = require("test/utils/delete_all_products");
const ProductCreator = require('src/apiServices/product/class/product_creator')
describe('API /products router', () => {
	before(async()=>{ await deleteAllProducts(); })
	describe('product post request', () => {
		describe('missing any body param response status 400', () => {
			it('missing Name send 400 status', (done) => {
				const expected_response = {
					status:'Product not created',
					error: 'Missing Name field'
				}
				request(app)
					.post("/products")
					.set('content-type', 'application/json')
					.send({
						Description: "description",
						Barcode: "barcode",
						Price: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
						expect(res.body)
							.to
							.be
							.deep
							.equal(expected_response)
						done()
					})
			});
			it('missing Description send 400 status', (done) => {
				const expected_response = {
					status:'Product not created',
					error: 'Missing Description field'
				}
				request(app)
					.post("/products")
					.set('content-type', 'application/json')
					.send({
						Name: "description",
						Barcode: "barcode",
						Price: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
						expect(res.body)
							.to
							.be
							.deep
							.equal(expected_response)
						done()
					})
			});
			it('missing Price send 400 status', (done) => {
				const expected_response = {
					status:'Product not created',
					error: 'Missing Price field'
				}
				request(app)
					.post("/products")
					.set('content-type', 'application/json')
					.send({
						Name: "description",
						Barcode: "barcode",
						Description: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
						expect(res.body)
							.to
							.be
							.deep
							.equal(expected_response)
						done()
					})
			});
			it('missing Barcode send 400 status', (done) => {
				const expected_response = {
					status:'Product not created',
					error: 'Missing Barcode field'
				}
				request(app)
					.post("/products")
					.set('content-type', 'application/json')
					.send({
						Name: "description",
						Price: "barcode",
						Description: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
						expect(res.body)
							.to
							.be
							.deep
							.equal(expected_response)
						done()
					})
			});
		});
		it('valid request post return product dao', (done) => {
			const productFields = {
				Name: "test name",
				Description: "description test",
				Price: 1234323,
				Barcode:"Many letters"
			}
			request(app)
				.post("/products")
				.set('content-type', 'application/json')
				.send(productFields)
				.end((err,res)=>{
					if(err) done(err);

					expect(res).to.have.status(201)
					expect(res).to.be.json;
					expect(res).to.have.property("body")
					const body = res.body;
					expect(body).to.deep.equal({
						status:"product created",
						product: productFields
					})
					done();
				})
		});
	});
	describe('get /product/<barcode> test', () => {
		const product = {
			ID_Product: "express_product_test_id",
			Name: "express_product_test_name",
			Description: "express_product_test_description",
			Price: 123,
			Barcode: "express_product_test_barcode",
		}
		before(async()=>{
			await ProductCreator.create(product);
		})

		it('request /product/barcode return Product ', (done) => {
			request(app)
				.get(`/products/${product.Barcode}`)
				.set('content-type', 'application/json')
				.end((err,res)=>{
					if(err) done(err);

					expect(res).to.have.status(200)
					expect(res).to.have.property('body');
					expect(res).to.be.json;

					expect(res.body)
						.to.be
						.deep.equal(product)
					done();
				})
		});
	});
	describe('put /product/<barcode> test', () => {
		let product_to_modify = {
			Name: "product name_put-test",
			Description: "product description_put-test",
			Price: 1,
			Barcode: "product barcode_put-test",
		};
		let new_product_fields = {
			Name: "product newName_put-test"
		}
		before(async()=>{
			await ProductCreator.create(product_to_modify)
		})
		it('try modifiy Unregisted Barcode', (done) => {
			const expected_response = {
				status:"Product not modify",
				error:"UnregisteredBarcode"
			}
			request(app)
				.put("/products/nonExistBarcode")
				.set('content-type', 'application/json')
				.send({
					Name: 'new name'
				})
				.end((err,res)=>{
					if(err) done(err);
					expect(res).to.have.status(400);
					expect(res).to.be.json;
					expect(res.body)
						.to
						.be
						.deep
						.equal(expected_response)
					done();
				})
		});
		it('successful modify returns 200 ', (done) => {
			request(app)
				.put(`/products/${product_to_modify.Barcode}`)
				.set('content-type', 'application/json')
				.send(new_product_fields)
				.end((err,res)=>{
					if(err) done(err);
					expect(res).to.be.json;
					expect(res).to.have.status(200)
					done();
				})
		});
	});
});
