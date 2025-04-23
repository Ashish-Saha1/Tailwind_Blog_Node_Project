const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{

    res.render('indexBody.ejs', {title: 'Home Page'})
})

router.get('/about', (req,res)=>{
    res.render('about.ejs',{title: 'About Page'})
    
})


module.exports = router;