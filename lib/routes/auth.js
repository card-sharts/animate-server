const router = require('express').Router();
const { sign } = require('../auth/token-service');
const ensureAuth = require('../auth/ensure-auth')();
const Admin = require('../models/admin');

const hasEmailAndPassword = ({ body }, res, next) => {
    const { email, password } = body;
    if(!email || !password) {
        throw {
            status: 400,
            error: 'Email and password required'
        };
    }
    next();
};

module.exports = router
    .get('/verify', ensureAuth, (req, res) => {
        res.json({ verified: true });
    })
    .post('/signup', hasEmailAndPassword, ({ body }, res, next) => {
        const { email, password } = body;
        delete body.password;
        return Admin.exists({ email })
            .then(exists => {
                if(exists) {
                    throw {
                        code: 400,
                        message: 'Email exists'
                    };
                }
                const admin = new Admin(body);

                admin.generateHash(password);
                return admin.save();
            })
            .then((admin) => {
                return res.json({ token: sign(admin) }); 
            })
            .catch(next);
    })
    .post('/signin', hasEmailAndPassword, ({ body }, res, next) => {
        const { email, password } = body;
        delete body.password;
        return Admin.findOne({ email })
            .then(admin => {
                if(!admin || !admin.comparePassword(password)) {
                    throw {
                        code: 401,
                        message: 'Invalid email or password'
                    };
                }
                return res.json({ token: sign(admin) });
            })
            .catch(next);
    });