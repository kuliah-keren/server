const express = require('express')
const Router = express.Router()
const file = require('../helpers/helper')
const Image = require('../models/image.js')
Router.get('/', (req, res) => {
    res.send('hi guys')
})
Router.post('/upload',
    file.multer.single('file'),
    file.sendUploadToGCS,
    (req, res) => {
        Image.create({
                name: req.body.name,
                link: req.file.cloudStoragePublicUrl
            })
            .then(() => {
                res.status(200).json({
                    message: 'Your file is successfully uploaded',
                    link: req.file.cloudStoragePublicUrl
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    });
module.exports = Router