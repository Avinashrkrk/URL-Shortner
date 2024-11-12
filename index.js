require('dotenv').config()
const express = require('express')
const urlRoute = require('./routes/url.router')
const {connectMongoose} = require('./connect')
const URL = require('./models/url.model')

const app = express();

connectMongoose('mongodb://localhost:27017/url-shortner')
.then(()=>console.log("Mongodb connected"))

app.use(express.json())

app.use('/url', urlRoute)

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } 
        );

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
});


app.listen(process.env.PORT, ()=>console.log(`Server is Started at ${process.env.PORT}`))