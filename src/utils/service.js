import axios from 'axios'

/**
 * 創建axios實體函數 並可以使用自定義的配置
 * @return {AxiosInstance}  axios實體
 */

const createService = () => {
  // 使用axios 創建實體
  const service = axios.create()

  // axios 請求攔截器 每一次發API請求時都會觸發
  service.interceptors.request.use(
    // 在發送請求之前的處理
    (config) => {
      config.data.SystemParameter = import.meta.env.VITE_SYSTEM_PARAMETER

      return config
    },
    (error) => {
      // 對請求錯誤的處理
      return Promise.reject(error)
    }
  )

  // axios 回應攔截器 每一次API請求回應時都會觸發

  service.interceptors.response.use((response) => {
    // 回應成功的處理

    // 通常回應成功會直接回傳資料
    // 公司的資料格式不符 會用ApiStatus來判斷是否成功 因此這邊需要做判斷
    return response.data
  })

  return service
}

// 創建請求函數
const createRequest = (service) => {
  /**
   * 請求函數
   * @param {Object} config - axios配置
   * @return {Promise} Promise
   */
  return (config) => {
    /**
     * 在每次發送api請求時, 自行將token , systemParameter 傳入
     */

    // systemParameter
    // const systemParameter = localStorage.getItem('systemParameter') || undefined

    // token
    // const token = localStorage.getItem('token') || undefined

    const defaultConfig = {
      headers: {
        'Content-Type': 'application/json'
      },

      // 測試用
      // baseURL: 'https://jsonplaceholder.typicode.com',

      // api的路徑 => 根據現在是 '開發環境' or '正式環境' 決定帶入api的路徑
      // baseURL: ip,

      data: {}

      //   data: { systemParameter, token }
    }

    // 合併config配置
    const mergeConfig = { ...defaultConfig, ...config }

    // 使用loadsh的merge函數合併配置 (options)
    // const mergeConfig = _.merge(defaultConfig,config)

    return service(mergeConfig)
  }
}

const service = createService()

// 匯出請求函數 使用此函數來發送api請求
export const request = createRequest(service)
