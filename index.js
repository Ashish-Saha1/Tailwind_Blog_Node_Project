require('dotenv').config();
const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')

const mainRoutes = require('./Server/Routes/main')
const dbConnect = require('./Server/Config/db')


//database connect
dbConnect()



//Layouts
app.use(expressLayouts);
app.set('layout', './Layouts/main.ejs')
app.set('view engine', 'ejs');


//Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use(express.static('Public'))

//Routes
app.use("/",mainRoutes)

const PORT =  process.env.PORT

app.listen(PORT, ()=>{
    console.log(`listing on Port ${PORT}`)
})


