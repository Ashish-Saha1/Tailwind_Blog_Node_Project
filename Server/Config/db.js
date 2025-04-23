const mongoose = require('mongoose')

const dbConnect = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/TailwindBlog')
        console.log(`Database is connected`)
    } catch (error) {
        console.log(`DB connection problem ${error}`)
    }
}


module.exports = dbConnect;