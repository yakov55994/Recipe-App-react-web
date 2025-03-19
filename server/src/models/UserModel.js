// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 2,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => /^[A-Za-z\u0590-\u05FF\s]+$/.test(value),
      message: 'Full name must only contain Hebrew or English alphabetic characters and spaces.'
    }
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 2,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => /^[A-Za-z\u0590-\u05FF\s]+$/.test(value),
      message: 'Full name must only contain Hebrew or English alphabetic characters and spaces.'
    }
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe' 
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  confirmSendMailing: { type:Boolean, required: true}
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check if password matches
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
