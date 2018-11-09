const express = require('express')
const Router = express.Router()
const file = require('../helpers/helper')
Router.get('/', (req, res) => {
    res.send('hi guys')
})
Router.post('/upload',
    file.multer.single('file'),
    file.sendUploadToGCS,
    (req, res) => {
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
        })
    });
module.exports = Router