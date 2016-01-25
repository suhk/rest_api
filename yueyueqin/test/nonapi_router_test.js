const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server');
var origin  = 'localhost:3000';

describe('the non api app', () => {
  it('should be able to retrieve nonapi url', (done) => {
    chai.request(origin)
      .get('/name')
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('name');
        done();
      });
  });

});
