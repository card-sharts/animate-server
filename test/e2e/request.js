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

const check400 = res => {
    assert.equal(res.status, 400, 'expected 400 http status code');
    return res;
};

const save = (path, data) => {
    return request
        .post(`/api/${path}`)
        .send(data)
        .then(checkOk)
        .then(({ body }) => body);
};

after(() => server.close());

module.exports = {
    request,
    checkOk,
    check400,
    save
};