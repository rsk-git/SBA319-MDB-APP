import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import post from '../models/Post.js';

const userSchema = new mongoose.Schema({
  username: {
  type: String,
  required:true,
  minLength:3,
  maxLength:20
  
  },
  password: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 12
  },
  email: {
      type: String,
      required:true,
  },
  passwordHash:{
    type: String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
  
  })
  

  // index for username
userSchema.index({username:1});



  const User = mongoose.model('User',userSchema);
  
  export default User;