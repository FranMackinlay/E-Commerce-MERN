import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  flags: {
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
