const router = require('express').Router();
const Essay = require('../models/essay');
const Photo = require('../models/photo');
const Reference = require('../models/reference');
const { respond, getParam } = require('./route-helpers');

module.exports = router
    .param('id', getParam)
    .get('/', respond(() => Essay.find()))

    .post('/', (req, res, next) => {
        let submission = {};
        if(!req.body.photos) {
            throw {
                status: 400,
                error: 'Photos are required.'
            };
        }
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
                        if(!req.body.references) return res.json(submission);
                        let savedReferences = req.body.references.map(reference => {
                            reference.essayId = submission.essay._id;
                            return reference;
                        });
                        return Reference.create(savedReferences)
                            .then(response => {
                                submission.references = response;
                                res.json(submission);
                            });
                    });
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Essay.essayById(req.id)
            .then(([results]) => {
                res.json(results);
            })
            .catch(next);
    });