const express = require('express')
const postsModel = require('../models/postsModel')
const cloudinary = require('cloudinary').v2


const router = express.Router()

router.get('/posts', async (req, res) => {

    try {
        const pageNo = req.query.page
        const pagesToSkip = 5 * (pageNo - 1)
        const posts = await postsModel
            .find().sort({ date: -1 })
            .skip(pagesToSkip).limit(5)
            
        res.status(200).json(posts)
    }
    catch (e) {
        if (e) { res.status(500).json({ message: e.message }) }
    }
})


router.post('/posts', async (req, res) => {
    try {
        const { image, author, location, description } = req.body

        // const file = req.files.photo;


        const uploadedImageUrl = await cloudinary.uploader.upload(image, {
            upload_preset: 'instacloneImage',
            public_id: `${author}Image`,
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico']
        },
            function (error, result) {
                if (error) {
                    console.log(error);
                }
            })

        const imageUrl = uploadedImageUrl.url

        const createdPost = await postsModel.create({
            name: author,
            location,
            likes: 0,
            description,
            PostImage: imageUrl,
            date: Date.now()
        })
        console.log(createdPost)
        res.status(200).json(createdPost)
    }
    catch (e) {
        if (e) { res.status(500).json({ message: e.message }) }
    }
})

module.exports = router;