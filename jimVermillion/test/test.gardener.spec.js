'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server'); //eslint-disable-line
const Gardener = require(__dirname + '/../models/gardener');
const request = chai.request;

describe('the gardener api', () => {
  after( done => {
    mongoose.connection.db.dropDatabase(() => {
      done(); //eslint-disable-line
    });
  });

  it('should be able to retrieve all our gardeners', (done) => {
    request('localhost:3000')
      .get('/api/gardeners')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

    it('shoud be able to post a gardener', done => {
      request('localhost:3000')
        .post('/api/gardeners')
        .send({ name: 'test gardener' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('test gardener');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

  describe('rest requests that require a gardener already in db', () => {
    beforeEach((done) => {
      Gardener.create({ name: 'test gardener' }, (err, data) => { //eslint-disable-line
        this.testGardener = data;
        done();
      });
    });

    it('should delete the test gardener', done => {
      request('localhost:3000')
      .delete('/api/gardeners/' + this.testGardener._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should put the test gardener into the db', done => {
      request('localhost:3000')
      .put('/api/gardeners/' + this.testGardener._id)
      .send( { name: 'second test gardener' } )
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('second test gardener');
        done();
      });
    });
  });
});
