const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
chai.use(chaiHttp);
const http = require('http');

const app = require('../../lib/app');

const server = http.createServer(app);
const request = chai.request(server).keepOpen();

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

after(() => server.close());

module.exports = {
    request,
    checkOk
};