const router = require('express').Router();
const Essay = require('../models/essay');

const { respond } = require('./route-helpers');

module.exports = router

    .get('/', respond(() => Essay.find()));