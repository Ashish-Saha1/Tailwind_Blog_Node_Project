require('dotenv').config();
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')






app.get('/', (req,res)=>{
    res.render('./Layout/main.ejs')
    //res.send("Hello")
})

app.set('view engine', 'ejs');
app.set('layouts', './Layout/main.ejs')
app.use(expressEjsLayouts)
app.use(express.static('Public'))


const PORT =  process.env.PORT

app.listen(PORT, ()=>{
    console.log(`listing on Port ${PORT}`)
})