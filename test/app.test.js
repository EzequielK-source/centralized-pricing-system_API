//test configs
const chai = require('chai')
const ChaiHttp = require('chai-http')
chai.use(ChaiHttp);
const expect = chai.expect;
//app
const app = require("src/app");

const request = chai.request;
describe('Express API test', () => {
	it('api /products request status 200', (done) => {
		request(app)
			.get("/products")
			.end((err,res)=>{
				if(err) done(err);
				expect(res).to.have.status(200)
				done();
			})
	});
});
