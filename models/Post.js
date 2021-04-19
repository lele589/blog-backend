const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
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

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('post', postSchema);