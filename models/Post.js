const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    category: String,
    image: String,
    location: String,
    price: Number,
    description: String,
    date: Date,
    public: Boolean,
    pets: Boolean,
});

module.exports = mongoose.model('post', postSchema);