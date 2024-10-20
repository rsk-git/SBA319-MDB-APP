import { Router } from "express";
import Comment from '../models/Comment.js';
import { error } from '../utils/error.js';

const commentsRouter = new Router();

/**
 * GET/comments
 */
commentsRouter.get ('/', async(req,res) => {
  const {userId, postId} = req.query
 try {
  const filter={};
  if (userId) filter.userId = userId;
  if(postId) filter.postId = postId;
  const comments = await Comment.find(filter);
  res.join(comments);
 }catch (e){
  console.error(e)
  res.status(500).json({error: 'Error while fetching comments'});
 }
   
});

/**
 * GET /comments/:id
Retrieves the comment with the specified id
 */
commentsRouter.get('/:id', async(req,res,next )=> {
   try{
    const comment = await Comment.findById(req.params.id);
    if(!comment){
      return next(error("Comment not found"));
    }res.json(comment);
   }catch(e){
    console.error(e);
    next(error('Error occured while fetching comment '));
   }
});

/**
 * PATCH /comments/:id
Used to update a comment with the specified id with a new body.
 */

commentsRouter.patch("/:id",async (req, res, next) => {
    console.log(req.params);
  try{
    const comment = await Comment.findByIdAndUpdate(req.params.id);
    if(!comment){
      return next(error('Comment not found'));
    }res.json(comment);
  }catch(e){
    console.log(e);
    next(error('Error occured while fetching comment'));
  }
    
  });

  /**
   * DELETE /comments/:id
Used to delete a comment with the specified id.
   */

commentsRouter.delete("/:id",async(req, res, next) => {
   try{
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if(!comment.$isValid){
      return next(error("Comment not found"));
    }res.json(comment);
   }catch (e){
    console.log(e);
    next(error("Error occured while fetching comment"));
   }
  });

  /**
   * GET /comments?userId=<VALUE>
Retrieves comments by the user with the specified userId.
   */

commentsRouter.get('/', async(req,res,next) => {
    const userId = req.query.userId;

  const userComments = await Comment.find({userId});
 if(!userId){
  return res.status(400).json({error: "userId required"});
 }
 try{
  const userComments = await Comment.find({userId});
  if(userComments.length >0){
    res.json(userComments);
  }else {
    next();
  }
 }catch (e){
  console.log(e);
  next(error("Error occured while fetching comment"));
 }
});

/**
 * GET /comments?postId=<VALUE>
Retrieves comments made on the post with the specified postId.
 */

commentsRouter.get('/', async(req,res,next) => {
    const postId = req.query.postId;

  if (!postId){
    return res.status(400).json({error: "postId required"});
  }
  try{
  const postComments = await Comment.find({postId});
  if (postComments.length >0){
    res.json(postComments);
  }else {
    next();
  }
}catch (e){
  console.log(e);
  next(error("Error occured while fetching comment"));
}
});


export default commentsRouter;