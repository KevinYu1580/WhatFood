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
    title: '發生錯誤！',
    icon: 'error'
  },
  inputError: {
    title: '您輸入的資料有誤！',
    icon: 'error'
  },
  loginFail: {
    title: '登入失敗！',
    icon: 'userWarning',
    text: `帳號或密碼錯誤，請重新輸入<br/>
    (錯誤3次將被鎖定 15 分鐘，目前已 2 次)`
  },
  accountLocked: {
    title: '帳號已鎖定！',
    icon: 'userLocked',
    text: `帳號或密碼已錯 3 次，<br/>系統將鎖定此帳號 15 分鐘`
  },
  temporarilyLocked: {
    title: '帳號暫時被鎖定！',
    icon: 'userLocked',
    text: `帳號或密碼已錯 3 次，<br/>請 14 分鐘後再試`
  },
  accountDeactivated: {
    title: '帳號已停用！',
    icon: 'userError',
    text: `您的帳號已停用，<br/>若要使用請聯繫系統管理員`
  },
  noPermission: {
    title: '此帳號無權限！',
    icon: 'userError',
    text: `您的帳號權限全為禁止檢視，無法登入！<br/>
    若要使用請聯繫系統管理員`
  },
  passwordMustBeDifferent: {
    title: '密碼不能與前 1 次相同！',
    icon: 'warning',
    text: `請重新輸入`
  },
  usingDefaultPassword: {
    title: '您正在使用預設密碼登入',
    icon: 'warning',
    text: `系統將自動跳轉頁面，<br/>
    請您立即變更密碼`
  },
  overUpdated90Days: {
    title: '密碼已超過 90天 未變更',
    icon: 'warning',
    text: `系統將自動跳轉頁面，<br/>
    請您立即變更密碼`
  },
  passwordChangeFailed: {
    title: '密碼無法變更！',
    icon: 'warning',
    text: `您的密碼於 1 天內已變更過，<br/>
    無法再次變更`
  },
  cannotDelete: {
    title: '無法刪除此資料！',
    icon: 'warning',
    text: `先把已套用此權限的帳號，<br/>
    轉換套用別的權限角色！<br/>
    (套用中帳號數： 15 )`
  },
  cannotDeactivated: {
    title: '無法停用此資料！',
    icon: 'warning',
    text: `先把已套用此權限的帳號，<br/>
    轉換套用別的權限角色！<br/>
    (套用中帳號數： 15 )`
  },
  addUser: {
    title: '新增使用者？',
    icon: 'userAdd',
    cancelText: '取消',
    cancelColor: 'primary-color',
    cancelType: 'outline',
    confirmText: '新增',
    confirmColor: 'primary-color',
    confirmType: 'filled'
  },
  lineNotifications: {
    title: '繼續完成LINE通知綁定',
    text: `跳轉至LINE Notify<br/>
    連動要接收通知的聊天室`,
    icon: 'bell',
    cancelText: '取消',
    cancelColor: 'primary-color',
    cancelType: 'outline',
    confirmText: '繼續',
    confirmColor: 'primary-color',
    confirmType: 'filled'
  },
  deactivatedPermission: {
    title: '要停用此權限嗎？',
    text: `權限停用後，<br/>
    套用此權限的帳號將一併同步停用！`,
    icon: 'lock',
    cancelText: '取消',
    cancelColor: 'alert-color-default',
    cancelType: 'outline',
    confirmText: '停用',
    confirmColor: 'alert-color-default',
    confirmType: 'filled'
  },
  discardChanges: {
    title: '要捨棄編輯中的內容嗎?',
    text: `捨棄的資料無法復原哦！`,
    icon: 'trashCan',
    cancelText: '取消',
    cancelColor: 'alert-color-default',
    cancelType: 'outline',
    confirmText: '捨棄',
    confirmColor: 'alert-color-default',
    confirmType: 'filled'
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
