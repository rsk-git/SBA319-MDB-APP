import {Router} from 'express';
import express from 'express';
import Post from '../models/Post.js'

const postsRouter = new Router();

/**
 * GET/api/posts/
 */
postsRouter.get('/', async(req,res)=> {
 
        const posts = await Post.find();
        // console.log(posts);
        if(posts){
            res.json({posts});
        }else {
            res.json({message: 'No posts found'})
        }
    
});

/**
 * GET /api/posts/:id
 */
postsRouter.get('/:id', async(req,res)=> {
  
        const posts = await Post.findById(req.params.id);
        // console.log(posts);
        if(posts){
            res.json({posts});
        }
    else{
        res.json({message: "No projects found"});
    }
});

/**
 * PUT /api/posts/:id
 */
postsRouter.put('/:id',async (req,res) => {
    const {id} = req.params;
    const {body} = req.body;
    const updatedPost = await Post.findByIdAndUpdate (id, body, {
      new: true 
    });

    if(updatedPost){
        res.json({updatedPost});
    }else{
        res.json({message: `Error updating post: ${id}`});
    }
});

// /**
//  * POST/
//  */description create a new post doc

postsRouter.post ('/', async(req,res) => {

       const{body} = req;
      
       const newPost = await Post.create(body)

       if (newPost){
        res.json(newPost);

       }else{
        res.json({error: 'Error creating post'})
       }
   
});

/**
 * DELETE /api/projects/:id
 */
postsRouter.delete("/:id", async (req, res, next) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
  
      if (deletedPost) {
        res.json({
          message: `Post deleted: ${req.params.id}`,
          deletedPost,
        });
      } else {
        res.json({ message: `Error deleting post: ${req.params.id}` });
      }
    } catch (error) {
      next(error);
    }
  });

export default postsRouter;

