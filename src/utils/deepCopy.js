export default function deepCopy(obj) {
  // 判断输入是否为对象或数组
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  // 创建新的对象或数组
  const newObjOrArr = Array.isArray(obj) ? [] : {}

  // 遍历原始对象或数组的属性或元素
  for (let key in obj) {
    // 如果属性是对象或数组，递归调用 deepCopy 函数
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObjOrArr[key] = deepCopy(obj[key])
    } else {
      // 如果属性是基本类型，则直接赋值
      newObjOrArr[key] = obj[key]
    }
  }

  return newObjOrArr
}
