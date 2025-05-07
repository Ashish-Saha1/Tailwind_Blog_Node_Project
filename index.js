require('dotenv').config();
const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')

//Internal imports
const mainRoutes = require('./Server/Routes/main');
const adminRoutes = require('./Server/Routes/admin');
const dbConnect = require('./Server/Config/db');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const PORT =  process.env.PORT

//database connect
dbConnect()



//Layouts
app.use(expressLayouts);
app.set('layout', './Layouts/main.ejs')
app.set('view engine', 'ejs');


//Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())




app.use(express.static('Public'))

//Routes
app.use("/",mainRoutes)
app.use("/admin",adminRoutes)



//Error handling no routes match

app.use((req,res,next)=>{
    next('No Routes found')
})


//Error Handling 

app.use((err,req,res,next)=>{
    if(res.headersSent){
        next("There was a problem as hopefully Headers already sent")
    }else if(err instanceof multer.MulterError){
        
        next('Multer error catched')
    }
    res.send(`Error Catched is: ${err}` )
})


app.listen(PORT, ()=>{
    console.log(`listing on Port ${PORT}`)
})



