const isDev = process.env.NODE_ENV === 'development'

const portNumber = 3000

let proxyPort = null

// 判斷是否為部署環境
// 若是部署環境，則使用部署環境的代理伺服器網址
// 若不是部署環境，則使用本地端的代理伺服器網址
if (isDev) {
  proxyPort = `http://localhost:${portNumber}`
} else {
  // 判斷是否為
  if (window.location.hostname == '127.0.0.1') {
    proxyPort = `${location.protocol}//${location.host}`
  } else {
    proxyPort = 'https://kevinyu1580.github.io/WhatFood'
  }
}

export { portNumber, proxyPort }
