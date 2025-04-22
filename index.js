require('dotenv').config();
const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')






app.get('/', (req,res)=>{
    res.render('./Layout/main.ejs')
    //res.send("Hello")
})

app.get('/about', (req,res)=>{
    res.render('./about.ejs')
    //res.send("ABout Page")
})

app.use(express.static('Public'))

app.use(expressLayouts)
app.set('layouts', './Layout/main.ejs')
app.set('view engine', 'ejs');


const PORT =  process.env.PORT

app.listen(PORT, ()=>{
    console.log(`listing on Port ${PORT}`)
})