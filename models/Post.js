import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    body: {
        type: String,
        required: true,

    },
    author: {
      type: String,
      required:true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    topic: {
        type: String,
        enum: ['Javascript', 'Python', 'React','Express', "Programming"]

    }
});


// TODO: CREATE INDEX 


postSchema.index({ title: 1 });
postSchema.index({topic: 1});
postSchema.index({postId: 1});

// create a new Post model
const Post = mongoose.model('Post', postSchema);

export default Post;