// 這是一個代理伺服器，用來轉發前端的請求到Google Maps API

import express from 'express'
import axios from 'axios'
import cors from 'cors'
import { proxyPort, portNumber } from './config.mjs'

const app = express()

app.use(express.json())

// 啟用所有CORS請求
app.use(cors())

// 搜尋附近地點api
app.post('/api/places_nearbysearch', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: req.body
    })
    res.json(response.data)
  } catch (error) {
    res.send(error.message)
  }
})

// 地點詳細資訊api
app.post('/api/places_detail', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: req.body
    })
    res.json(response.data)
  } catch (error) {
    res.send(error.message)
  }
})

app.listen(portNumber, () => {
  console.log(`Proxy server running at ${proxyPort}`)
})
