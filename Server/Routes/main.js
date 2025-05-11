const express = require('express');
const router = express.Router();
const Post = require('../Model/post');
const User = require('../Model/user');
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


router.get('/check', async(req,res)=>{
    const posts = await Post.findOne({'title': "Express JS"})

    res.render('post', {posts})
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