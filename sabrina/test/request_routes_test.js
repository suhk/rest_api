const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/requests_test';

const server = require(__dirname + '/../server');
const Requests = require(__dirname + '/../models/request')
var origin = 'localhost:3000';

describe('the requests api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to GET all our requests', (done) => {
    request(origin)
    .get('/requestsAll')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  })

  it('should create a request with a POST', (done) => {
    request(origin)
      .post('/requests')
      .send({firstName: 'test request'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.firstName).to.eql('test request');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a request already in db', () => {
    beforeEach((done) => {
      Requests.create({firstName: 'test request'}, (err, data) => {
        this.testRequest = data;
        done();
      });
    });

    it('should be able to UPDATE a request', (done) => {
      request(origin)
        .put('/requests/' + this.testRequest._id)
        .send({firstName: 'new request name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Successfully updated request');
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should be able to DELETE a request', (done) => {
      request(origin)
        .delete('/requests/' + this.testRequest._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Successfully deleted request');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
