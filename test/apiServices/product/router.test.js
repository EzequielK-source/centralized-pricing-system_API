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
			it('missing Name throw error', (done) => {
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
		});
	});
});
