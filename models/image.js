var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/kuliah-keren', {
    useNewUrlParser: true
})
const Schema = mongoose.Schema;
const imagesSchema = new Schema({
    name: String,
    link: String
})

const Image = mongoose.model('Image', imagesSchema)

module.exports = Image