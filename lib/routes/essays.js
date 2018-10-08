const router = require('express').Router();
const Essay = require('../models/essay');
const Photo = require('../models/photo');
const { respond } = require('./route-helpers');

module.exports = router
    .get('/', respond(() => Essay.find()))

    .post('/', (req, res, next) => {
        Essay.create(req.body)
            .then(essay => {
                return Promise.all(req.body.photos.map(photo => {
                    photo.essayId = essay._id;
                    Photo.create(photo);
                }))
                    .then(response => {
                        console.log(response);
                        res.json(response);
                    });
            })
            .catch(next);
    });