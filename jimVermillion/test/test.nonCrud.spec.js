'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server'); //eslint-disable-line
const request = chai.request;

const Flower = require(__dirname + '/../models/flower');
const Gardener = require(__dirname + '/../models/gardener');

describe('the gardener api', () => {
  before( done => {
    Flower.create({ name: 'test flower' }, (err, data) => { //eslint-disable-line
        this.testFlower = data;
      });
    Gardener.create({ name: 'test gardener' }, (err, data) => { //eslint-disable-line
        this.testGardener = data;
        done();
      });
  });

  after( done => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our gardeners', (done) => {
    request('localhost:3000')
      .get('/nonCrud/howManyFlowers')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('With the gardeners on hand we can potentially grow 1 flowers.'); //eslint-disable-line
        done();
      });
  });
});
