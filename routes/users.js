import { Router } from "express";
import  User from "../models/User.js";
import {error} from '../utils/error.js';

const usersRouter = new Router();


/**
 * GET all users with filter option.
 */

usersRouter.get('/', async(req,res)=> {
    try {
        const user = await User.find();
        // console.log(users);
        res.json(user);
    } catch (error) {
        console.log(e);
        res.status(500).json({error: 'Error occured'});
    }
});


/**
 * GET user by Id
 */
usersRouter.get("/:id", (req,res) => {
    const user = user.find(u => u.id == req.params.id);
    if (!user){
        return next(error("User not found"))
;    }
    // console.log(req.query);
    // console.log("APIKEY:::", req.key);

    res.json(user);
});

/**
 * POST to create a new user
 */

usersRouter.post("/", (req, res) => {
    const { name, username, email,passwordHash } = req.body;
    if (!name || !username || !email || !passwordHash) {
        return res.status(400).json({ error: "All fields should be filled in" });
    }

    if (User.find((u) => u.username === username)) {
        return res.status(409).json({ error: "Username already in use" });
    }

    const newUser = {
        id: User[User.length - 1].id + 1,
        name,
        username,
        email,
    };
    User.push(newUser);
    res.status(201).json(newUser);
});


/**
 * PATCH
 */
usersRouter.patch("/:id",async (req,res, next) => {
    console.log("Request Body:", req.body )//logging the request body

    try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true});
    
    if(!user){
        return  res.status(404).json({error: "User not found."});
    }
res.json(user);

    }catch (e){
console.log(e);
res.status(500).json({error:e.message || "Error occured while fetching data"});
    }
   
});


/**
 * DELETE by user id
 */

usersRouter.delete ("/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((u) => u.id == req.params.id);

    if (userIndex === -1) {
        return next(error("Not Found"));
    }
const deleteUser = User.splice(userIndex, 1)[0];
res.json(deleteUser);
});

export default usersRouter;