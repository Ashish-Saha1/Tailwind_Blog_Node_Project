const express = require('express');
const router = express.Router();
const Post = require('../Model/post');
const User = require('../Model/user');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt')



// // const upload = multer({ dest: './Public/uploads/' });

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null, './public/uploads')
//     },
//     filename : function(req,file,cb){
//         let extName = path.extname(file.originalname);
//         const fileName = file.originalname
//             .replace(extName, "")
//             .toLowerCase()
//             .split(" ")
//             .join("_") +
//             "-" + Date.now()

//             cb(null, fileName + extName)
//     }
// })

// const upload = multer({
//      storage: storage,
//      limits : {
//         fileSize : 1000000
//      },
//      fileFilter : (req,file, cb)=>{
//         if(file.mimetype === "image/jpeg" || "image/jpg" || "image/png"){
//             cb(null, true)
//         }
//         else{
//             console.log('File type not matched');
            
            
//         }
        
//      }
    
//     })

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

// //Get method Login Page 
// router.get('/login', async (req,res)=>{
//     const locals = {
//         title: "login",
//         description : "This is a blog site using tailwind"
//     }
//     res.render('login',{locals})
    
// })

// //Get method Register Page 
// router.get('/register', async (req,res)=>{
//     const locals = {
//         title: "Register",
//         description : "This is a blog site using tailwind"
//     }
//     res.render('register',{locals})
    
// })

// //Post method Register Page 
// router.post('/register', upload.single('avatar'), async (req,res,next)=>{

//     const hashed = await bcrypt.hash(req.body.password, 10)
//     const formData = {
//         name : req.body.name,
//         username : req.body.username,
//         email : req.body.email,
//         phone : req.body.phone,
//         password : hashed,
//         avatar : req.file.filename,
//     }

//     try {
//         const user =  new User(formData);
//         const userCreate = user.save()
//         res.redirect('login')
//     } catch (error) {
//         console.log(`Error Catched register: ${error}`);
//         next("Error in Register")
//     }
    
// })


// //Post method Login Page 
// router.post('/login', async (req,res,next)=>{
    
//     try {
//         const user = await User.findOne(
//             {$or:[{"username": req.body.username},
//                 {"email": req.body.username},
//                 {"phone": req.body.username}]
                
//             })

//         if(user){
//             const matchPassword = await bcrypt.compare(req.body.password, user.password);
//             if(matchPassword){
//                 res.render('./Admin/dashboard.ejs', {})
//             }else{
//                 next("Password not matched")
//             }
//         }else{
//             next("User not Matched")
//         }

//     } catch (error) {
//         console.log(error);
        
//     }
        

// })



























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