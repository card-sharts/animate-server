const { assert } = require('chai');
const Admin = require('../../lib/models/admin');
const { getErrors } = require('./helpers');

describe('Admin model', () => {
    const credentials = {
        email: 'test@test.com',
        password: 'test123'
    };

    let admin;

    beforeEach(() => {
        admin = new Admin(credentials);
        admin.generateHash(credentials.password);
    });

    it('validates a good model', () => {
        assert.equal(admin.email, credentials.email);
        assert.isDefined(admin.hash, 'hash is defined');
        assert.notEqual(admin.hash, credentials.password, 'hash is different than password');
        assert.isTrue(admin.comparePassword(credentials.password), 'compare good password');
        assert.isFalse(admin.comparePassword('bad password'), 'compare bad password');
        assert.isUndefined(admin.password, 'password has been hashed');
    });

    it('validates required fields', () => {
        const admin = new Admin({});
        const errors = getErrors(admin.validateSync(), 2);
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
    });
});