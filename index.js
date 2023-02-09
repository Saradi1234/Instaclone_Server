require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_Name,
    api_key: process.env.CLOUDINARY_APIKey,
    api_secret: process.env.CLOUDINARY_APISecret,
});


// ENV VARIABLES
const port = process.env.PORT || 3000
const db_URL = process.env.DATABASE_URL


// CONNECTING TO DB
mongoose.connect(db_URL, () => { console.log('connected to db') })

// CONNECTING TO SERVER
app.listen(port, () => { console.log(`server is up at ${port}`) })