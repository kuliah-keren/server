var mongoose = require('mongoose');
mongoose.connect(process.env.CONNECT_DB, {
    useNewUrlParser: true
})
const Schema = mongoose.Schema;
const imagesSchema = new Schema({
    name: String,
    link: String
})

const Image = mongoose.model('Image', imagesSchema)

module.exports = Image