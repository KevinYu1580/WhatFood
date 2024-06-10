// 定義路由菜單順序
const menuOrderList = ['Home', 'WhatFood', 'WhatDrink', 'TestPage']

// 將菜單順序轉換為物件
export const menuOrder = menuOrderList.reduce((acc, item, index) => {
  acc[item] = index
  return acc
}, {})

// 菜單最後排序數字
export const lastMenuOrder = Object.values(menuOrder).sort((a, b) => b - a)[0]
