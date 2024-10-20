import mongoose from 'mongoose';



const commentSchema = new mongoose.Schema({  
    body: {
    type: String,
    required: true,
   },

   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },

   post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
   },
   created_at:{
    type: Date,
    default:Date.now,
   }
   }

 
);

// Index
commentSchema.index({post:1});

// Correct export statement
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
