const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;