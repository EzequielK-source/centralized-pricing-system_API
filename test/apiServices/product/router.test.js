//test configs
const chai = require('chai')
const ChaiHttp = require('chai-http')
chai.use(ChaiHttp);
const expect = chai.expect;
//app
const app = require("src/app");
const request = chai.request;


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
});
