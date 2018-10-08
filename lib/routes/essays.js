const router = require('express').Router();
const Essay = require('../models/essay');
const Photo = require('../models/photo');
const { respond } = require('./route-helpers');

module.exports = router
    .get('/', respond(() => Essay.find()))

    .post('/', (req, res, next) => {
        let submission = {};
        Essay.create(req.body)
            .then(essay => {
                submission.essay = essay;
                let savedPhotos = req.body.photos.map(photo => {
                    photo.essayId = essay._id;
                    return photo;
                });
                return Photo.create(savedPhotos)
                    .then(response => {
                        submission.photos = response;
                        res.json(submission);
                    });
            })
            .catch(next);
    });