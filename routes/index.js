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
                res.send({
                    status: 200,
                    message: 'Your file is successfully uploaded',
                    link: req.file.cloudStoragePublicUrl
                })
            })
            .catch(err => {
                res.send(err)
            })
    });
module.exports = Router