//test configs
const chai = require('chai')
const ChaiHttp = require('chai-http')
chai.use(ChaiHttp);
const expect = chai.expect;
//app
const app = require("src/app");
const request = chai.request;


describe('users route test', () => {
	describe('POST request', () => {
		describe('Missing any user field response 400', () => {
			it('missing username response 400', (done) => {
				const post_request_body = {
					Password: "password_test",
					Permissions: 1
				}
				request(app)
					.post('/users')
					.send(post_request_body)
					.end((err,res)=>{
						if(err) done(err);

						expect(res).to.have.status(400);
						done();
					});
			});
		});
		it('valid request', (done) => {
			const post_request_body = {
				Username: "username_test",
				Password: "password_test",
				Permissions: 1
			}
			request(app)
				.post('/users')
				.send(post_request_body)
				.end((err,res)=>{
					if(err) done(err);

					expect(res).to.have.status(201);
					done();
				})
		});
	});
});
