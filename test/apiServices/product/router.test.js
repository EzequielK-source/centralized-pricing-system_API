//test configs
const chai = require('chai')
const ChaiHttp = require('chai-http')
chai.use(ChaiHttp);
const expect = chai.expect;
//app
const app = require("src/app");
const request = chai.request;
const ProductCreator = require("src/apiServices/product/class/product_creator")

describe('API /products router', () => {
	describe('product post request', () => {
		describe('missing any body param response status 400', () => {
			it('missing Name send 400 status', (done) => {
				request(app)
					.post("/products")
					.send({
						Description: "description",
						Barcode: "barcode",
						Price: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
						done()
					})
			});
			it('missing Description send 400 status', (done) => {
				request(app)
					.post("/products")
					.send({
						Name: "description",
						Barcode: "barcode",
						Price: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
						done()
					})
			});
			it('missing Price send 400 status', (done) => {
				request(app)
					.post("/products")
					.send({
						Name: "description",
						Barcode: "barcode",
						Description: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
						done()
					})
			});
			it('missing Barcode send 400 status', (done) => {
				request(app)
					.post("/products")
					.send({
						Name: "description",
						Price: "barcode",
						Description: "Price"
					})
					.end((err,res)=>{
						if(err) done(err)
						expect(res).to.have.status(400)
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
});
