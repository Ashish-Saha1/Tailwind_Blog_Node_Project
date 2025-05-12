const express = require('express');
const router = express.Router();
const Post = require('../Model/post');
const User = require('../Model/user');
const authGurd = require('../../Helper/authGurd');

const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt')
const fs = require('fs');
const jwt = require('jsonwebtoken');





const adminLayout = "../Views/Layouts/admin.ejs"


// const upload = multer({ dest: './Public/uploads/' });

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './public/uploads')
    },
    filename : function(req,file,cb){
        let extName = path.extname(file.originalname);
        const fileName = file.originalname
            .replace(extName, "")
            .toLowerCase()
            .split(" ")
            .join("_") +
            "-" + Date.now()

            cb(null, fileName + extName)
    }
})

const upload = multer({
     storage: storage,
     limits : {
        fileSize : 1000000
     },
     fileFilter : (req,file, cb)=>{
        if(file.mimetype === "image/jpeg" || "image/jpg" || "image/png"){
            cb(null, true)
        }
        else{
            console.log('File type not matched');
            
            
        }
        
     }
    
    })


//Get method Login Page 
router.get('/login', async (req,res)=>{
    const locals = {
        title: "login",
        description : "This is a blog site using tailwind"
    }
    //Here cookieToken is passed because adminheader page cookieToken not found in login because show error
    //Now problem is solved by passed cookieToken another passed in dashboard route to loggled sign in-out
    // const cookieToken = req.cookies.token
    
    res.render('Admin/login',{locals, layout: adminLayout})
    
})



//Post method Login Page 
router.post('/login', async (req,res,next)=>{
    
    try {

        const user = await User.findOne(
            {$or:[{"username": req.body.username},
                {"email": req.body.username},
                {"phone": req.body.username}]
                
            })
console.log(user)
           
        

        if(user){
             //Jsonwebtoken
             const token = jwt.sign({user: req.body.username, userId: user._id, name: user.name}, process.env.JWT_SECRET_KEY);
             res.cookie('token', token, {httpOnly: true})
             
             
            const matchPassword = await bcrypt.compare(req.body.password, user.password);
            if(matchPassword){
                res.redirect('dashboard') 
            }else{
                next("Password not matched")
            }
        }else{
            next("User not Matched")
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
        

})


//Posr method Log Out route

router.get('/logout', (req,res,next)=>{
    res.clearCookie('token');
    res.redirect('login')
})


router.get('/dashboard',authGurd, async (req, res) => {
    try {
        let perPage = 5;
        let page = parseInt(req.query.page) || 1;

        let totalPost = await Post.countDocuments();
        let nextPage = page + 1;
        let hasNextPage = totalPost > page * perPage;

        const posts = await Post.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * perPage },
            { $limit: perPage },
        ]);


        res.render('./Admin/adminDashboard.ejs', {
            posts,
            user: req.user,
            name: req.name,
            layout: adminLayout,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }
});



//Get method Register Page 
router.get('/register', async (req,res)=>{
    const locals = {
        title: "Register",
        description : "This is a blog site using tailwind"
    }
    res.render('Admin/register',{locals, layout : adminLayout})
    
})


//Post method Register Page 
router.post('/register', upload.single('avatar'), async (req,res,next)=>{

    const deleteUploadedFile = async()=>{
        if(req.file){
            const filePath = path.join(__dirname, "../../Public/uploads", req.file.filename)
            try {
                await fs.promises.unlink(filePath)
                console.log('deleted')
            } catch (error) {
                console.log(filePath);
                
                console.log(`Failed to delete Uploaded file, ${error}`);
                
            }
        }
    }

    const {name,username,email,phone,password} = req.body;
        await deleteUploadedFile()
    if(!name || !username || !email || !phone || !password){
        return res.status(400).send('All field required')
    }

    const existUsername = await User.findOne({$or:[{username: req.body.username},{email: req.body.email},{phone: req.body.phone}]})
    if(existUsername){
        return res.status(400).send("Username or email or phone is already exist")
    }


    const hashed = await bcrypt.hash(req.body.password, 10)
    const formData = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        phone : req.body.phone,
        password : hashed,
        avatar : req.file? req.file.filename: null,
    }

    try {
        
            const user =  new User(formData);
            const userCreate = await user.save()
            res.redirect('login')
        
               
    } catch (error) {
        console.log(`Error Catched register: ${error}`);
        next("Error in Register: Error Is", error)
    }
    
})



//Post get route for details post

router.get('/post/:id', authGurd, async (req,res,next)=>{
    try {
        const postData = await Post.findOne({_id: req.params.id});

        res.render('Admin/post', {postData})
    } catch (error) {
        
    }
})






module.exports = router;