const express = require('express');
const router = express.Router();
const Post = require('../Model/post');
const User = require('../Model/user');
const authGurd = require('../../Helper/authGurd');

const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt')







//Get Method Home page
router.get('/', async (req,res)=>{
    const locals = {
        title: "Home Page",
        description : "This is a blog site using tailwind"
    }

    const perPage = 5;
    const page = parseInt(req.query.page) || 1;
    const totalDocument = await Post.countDocuments();
    let nextPage = page + 1;
    let hasNextPage = totalDocument > page * perPage;

    const posts = await Post.aggregate(
        [
            {$sort: {createdAt: -1}},
            { $skip: (page - 1) * perPage },
            {$limit: perPage},
        ]
    )


    res.render('indexBody', 
        {   locals, 
            posts,
            nextPage : hasNextPage? nextPage : null
        }

    )
})



//Get method About Page 
router.get('/about', async (req,res)=>{
    const locals = {
        title: "About Page",
        description : "This is a blog site using tailwind"
    }
   
    
    res.render('about.ejs',{locals})
    
})


//Get method Project Page 
router.get('/project', async (req,res)=>{
    const locals = {
        title: "Project Page",
        description : "This is a blog site using tailwind"
    }
   
    
    res.render('project.ejs',{locals})
    
})


//Get method Contact Page 
router.get('/contact', async (req,res)=>{
    const locals = {
        title: "Contact Page",
        description : "This is a blog site using tailwind"
    }
   
    
    res.render('contact.ejs',{locals})
    
})


//Get method Post Page 
// router.get('/post/:postId', async (req,res)=>{
//     const postId = await Post.findOne({_id: req.params.postId})
//     console.log(postId);
    
//     res.render('post', {postId:postId})
    
// })

router.get('/post/:id', async (req,res,next)=>{
    try {
        
        const postData = await Post.findOne({_id : req.params.id})

        const locals = {
            title: postData.title,
            description: "This is a Post page of this site"
        }

    res.render('post', {
        postData: postData,
        locals: locals,
        currentRoute : "/post/:id",
    })
    
    } catch (error) {
        next(error)
    }
})


//Post method Search Page 
router.post('/search', async (req,res)=>{
    const locals = {
        title: "Search Page",
        description : "This is a blog site using tailwind"
    }
        // const loggedInUser = req.user.username || null 
        // const paramsValue = req.params.user ? loggedInUser : null
        // console.log("params",paramsValue);
        // console.log("loggedInUser",loggedInUser);
        
    let searchTerm = req.body.search;
    //let pattern = new RegExp("[^a-z]", "ig")
    //This pattern keeps space word _ numeric
    let pattern = searchTerm.replace(/[^\w\s]g/, "")
    
    try {
        const searchData = await Post.find({title: new RegExp(pattern, "i")})
        res.render('search.ejs',{locals,searchData})

    } catch (error) {
        next(error)
    } 
})















// function postData(){
//     Post.insertMany([
//         {
//             title : 'Building API with Node JS',
//             description : 'Learn how to learn Node Js'
//         },
//         {
//             title : 'Deployment Node JS',
//             description : 'Understand the different way of Node js'
//         },
//         {
//             title : 'Authentication & Authoraization in Node JS',
//             description : 'How to work Node JS & Mongo DB'
//         },
//         {
//             title : 'Express JS',
//             description : 'Learn Express JS from LWS'
//         },
//         {
//             title : 'Learn JS',
//             description : 'Learn Javascript from LWS'
//         },
//         {
//             title : 'Bootstrap',
//             description : 'Bootstrap is a CSS framework'
//         },
//         {
//             title : 'Tailwind',
//             description : 'Tailwind is learn form LWS'
//         },

//         {
//             title : 'Next JS',
//             description : 'Next is a frame work of React'
//         },
//         {
//             title : 'React JS',
//             description : 'Learn React as a front end development'
//         },
//         {
//             title : 'Early Rise',
//             description : 'Above line is a Poem Title'
//         },

//         {
//             title : 'My Child',
//             description : 'Can not found any line to say'
//         },


//     ])
// }

// postData()





module.exports = router;