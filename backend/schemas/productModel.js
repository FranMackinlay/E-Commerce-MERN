import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    trim: true,
    required: true,
  },
  cateogory: {
    type: String,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
