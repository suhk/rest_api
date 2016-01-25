'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server'); //eslint-disable-line
const Flower = require(__dirname + '/../models/flower');
const request = chai.request;

describe('the flower api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done(); //eslint-disable-line
    });
  });

  it('should be able to retrieve all our flowers', done => {
    request('localhost:3000')
      .get('/api/flowers')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('shoud be able to post a flower', done => {
    request('localhost:3000')
      .post('/api/flowers')
      .send({ name: 'test flower' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test flower');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a flower alread in db', () => {
    beforeEach((done) => {
      Flower.create({ name: 'test flower' }, (err, data) => { //eslint-disable-line
        this.testFlower = data;
        done();
      });
    });

    it('should delete the test flower', done => {
      request('localhost:3000')
      .delete('/api/flowers/' + this.testFlower._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should put the test flower into the db', done => {
      request('localhost:3000')
      .put('/api/flowers/' + this.testFlower._id)
      .send({ name: 'second test flower' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('second test flower');
        done();
      });
    });
  });
});
