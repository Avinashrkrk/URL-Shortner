const express = require('express')
const router = express.Router()
const {handleGenerateShortUrl, handleGetAnalytics} = require('../controllers/url.controller')
const { model } = require('mongoose')

router.post("/", handleGenerateShortUrl)

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router


