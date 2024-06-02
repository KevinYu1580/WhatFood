export const modalSettings = {
  /**
   * 變數定義：
   *
   * 跳窗名
   * name : {
   *    title:跳窗標題
   *    icon:跳窗icon名稱 （對照 image/modalIcon/*.svg）
   *    cancelText: '取消', // 取消按鈕文字
   *    cancelColor: 'alert-color-default', // 取消按鈕顏色
   *    cancelType: 'outline', // 取消按鈕樣式
   *    cancelIcon: '', // 取消按鈕icon
   *    cancelIconColor:'alert-color-default', // 取消按鈕icon顏色
   *    cancelHandler:function // 取消按鈕事件
   *    cancelHandler:function // 取消按鈕事件
   *    confirmText: '確認', // 確認按鈕文字
   *    confirmColor: 'alert-color-default', // 確認按鈕顏色
   *    confirmType: 'filled', // 確認按鈕樣式
   *    confirmIcon: '' // 確認按鈕icon
   *    confirmIconColor:'alert-color-default' // 確認按鈕icon顏色
   *    funcHandler:function // 確認按鈕事件，或無按鈕跳窗關閉後觸發的事件
   *  }
   */
  test: {
    title: '您輸入的資料有誤！',
    text: '測試測試',
    icon: 'error',
    cancelText: '取消',
    cancelColor: 'alert-color-default',
    cancelType: 'outline',
    cancelIcon: 'cross',
    confirmText: '確認',
    confirmColor: 'alert-color-default',
    confirmType: 'filled',
    confirmIcon: 'stack',
    confirmIconColor: 'white'
  },
  success: {
    title: '成功！',
    icon: 'success'
  },
  error: {
    title: '錯誤！',
    icon: 'error'
  },

  delete: {
    title: '刪除此資料??',
    text: `刪除的資料無法復原哦！`,
    icon: 'trashCan',
    cancelText: '取消',
    cancelColor: 'alert-color-default',
    cancelType: 'outline',
    confirmText: '刪除',
    confirmColor: 'alert-color-default',
    confirmType: 'filled'
  }
}
