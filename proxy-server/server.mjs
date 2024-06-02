// const express = require('express')
// const axios = require('axios')
// const cors = require('cors')
// const app = express()
// const proxyPort = require('./config.mjs').proxyPort

import express from 'express'
import axios from 'axios'
import cors from 'cors'
import { proxyPort } from './config.mjs'

const app = express()

// 啟用所有CORS請求
app.use(cors())

// 搜尋附近地點api
app.get('/api/places_nearbysearch', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: req.query
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.listen(proxyPort, () => {
  console.log(`Proxy server running at http://localhost:${proxyPort}`)
})
