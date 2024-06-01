import { modalSettings } from '@/components/modal/modalSettings'

/**
 * @param {String} 跳窗名稱
 * @returns {Object}  跳窗資訊
 */
export const findModalSetting = (name) => {
  if (!modalSettings[name]) throw new Error('未設定此跳窗的模板')

  return modalSettings[name]
}
