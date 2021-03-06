require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/index')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', router)


app.listen(process.env.PORT, () => {
    console.log('server started on port ', process.env.PORT)
    mongoose.connect(process.env.CONNECT_DB, {
            useNewUrlParser: true
        })
        .then(() => {
            console.log('mongodb started')
        })
        .catch(err => {
            console.log(err)
        })
})