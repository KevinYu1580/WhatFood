// 定義自定義的亮色主題

const vars = {
  // 黑色彩階 | Black Tone Color
  black: '#000000',
  'black-tone-10': '#111111',
  'black-tone-20': '#212121',
  'black-tone-30': '#424242',
  'black-tone-40': '#616161',
  'black-tone-50': '#757575',
  'black-tone-60': '#9E9E9E',
  'black-tone-70': '#BDBDBD',
  'black-tone-80': '#E0E0E0',
  'black-tone-90': '#F5F5F5',
  'black-tone-95': '#FAFAFA',
  white: '#ffffff',

  // 提示訊息顏色 | Alert Message Color
  'security-color-default': '#a6cd38',
  'security-color-dark': '#72ad26',
  'security-color-tint': '#e6f5df',
  'hightlight-color-default': '#ffc617',
  'hightlight-color-dark': '#f19f00',
  'hightlight-color-tint': '#fffcf1',
  'alert-color-default': '#D8361C',
  'alert-color-dark': '#ae4444',
  'alert-color-tint': '#ffe6e5',

  // 主題顏色 | Theme Color
  'theme-color-pink-dark': '#e3708c',
  'theme-color-red-dark': '#ae4444',
  'theme-color-orange-dark': '#ed6a45',
  'theme-color-yellow-dark': '#ffb800',
  'theme-color-green-dark': '#4c9746',
  'theme-color-teal-dark': '#007a88',
  'theme-color-blue-dark': '#125783',
  'theme-color-purple-dark': '#674a8d',
  'theme-color-brown-dark': '#6c4f42',
  'theme-color-pink': '#f4aed0',
  'theme-color-red': '#d8361c',
  'theme-color-orange': '#f7931e',
  'theme-color-yellow': '#fd6',
  'theme-color-green': '#78be72',
  'theme-color-teal': '#00979c',
  'theme-color-blue': '#1d7eba',
  'theme-color-purple': '#9b7bc9',
  'theme-color-brown': '#9d7d6f',
  'theme-color-pink-tint': '#ffe0ef',
  'theme-color-red-tint': '#ffe6e5',
  'theme-color-orange-tint': '#ffe3c2',
  'theme-color-yellow-tint': '#fff1c0',
  'theme-color-green-tint': '#daedd8',
  'theme-color-teal-tint': '#e4f6f7',
  'theme-color-blue-tint': '#ceecff',
  'theme-color-purple-tint': '#dac9f1',
  'theme-color-brown-tint': '#d5c1b8',

  // 專案顏色 | Project Color
  'primary-color': '#ff312e', // 主要顏色
  'primary-color-dark': '#cc2724', // 加深變體
  'primary-color-tint': '#ff9897', // 淺色變體
  'primary-color-bg': '#ff6e6c', // 背景色

  'secondary-color': '#333138', // 次要顏色
  'secondary-color-dark': '#28272c', // 加深變體
  'secondary-color-tint': '#99989c', // 淺色變體
  'secondary-color-bg': '#706e73' // 背景色

  // *Tertiary colors(視專案需求自行增加)
  // tertiary-color: '',
  // 'tertiary-color-dark': '', // 加深變體
  // 'tertiary-color-tint': '', // 淺色變體
  // 'tertiary-color-bg': '', // 背景色
}

const customLightTheme = {
  dark: false, // 是否為深色模式

  // colors定義各種顏色, 可在各式vuetify元件中使用讓vuetify完成自動樣式渲染(於元件傳入color的prop，ex => props: color="primary")
  colors: {
    surface: '#fff', //元件預設色

    background: '#f7f8f9', // 背景顏色(v-main)

    ...vars,

    // 框架顏色 | Main Structure Color
    'header-color': vars['white'],
    'background-color': '#f7f8f9',
    'section-color': vars['white'],
    'sidebar-color': vars['white'],

    // 物件顏色 | Component Color
    'table-color': vars['white'],
    'table-border': vars['black-tone-60'],
    'table-header': vars['primary-color'],
    'table-row-color': vars['black-tone-90'],
    'table-header-text': vars['white'],
    'table-content-text': vars['black-tone-10'],

    'label-color': vars['black-tone-10'],

    // 按鈕 Button
    'primary-button-default': vars['primary-color'],
    'primary-button-hover': vars['primary-color-dark'],
    'primary-button-text': vars['white'],

    'secondary-button-default': vars['secondary-color'],
    'secondary-button-hover': vars['secondary-color-dark'],
    'secondary-button-text': vars['white'],

    'button-disable-text': vars['black-tone-60'],
    'button-disable': vars['black-tone-80'],

    'tab-default': vars['black-tone-50'],
    'tab-hover': vars['primary-color'],
    'tab-active': vars['primary-color-dark'],
    'tab-active-bg': vars['primary-color-tint'],
    'tab-disable': vars['black-tone-60'],
    'tab-disable-bg': vars['black-tone-80']
  },
  variables: {
    // vuetify原生變數
    'border-color': '#000000', // 邊框顏色
    'border-opacity': 0.12, // 邊框的不透明度
    'high-emphasis-opacity': 0.87, // 高重點元素的不透明度
    'medium-emphasis-opacity': 0.6, // 中重點元素的不透明度
    'disabled-opacity': 0.38, // 禁用狀態元素的不透明度
    'idle-opacity': 0.04, // 空閒狀態元素的不透明度
    'hover-opacity': 0.0, // 懸停狀態元素的不透明度
    'focus-opacity': 0.12, // 焦點狀態元素的不透明度
    'selected-opacity': 0.08, // 選定狀態元素的不透明度
    'activated-opacity': 0.12, // 激活狀態元素的不透明度
    'pressed-opacity': 0.12, // 按下狀態元素的不透明度
    'dragged-opacity': 0.08, // 拖拽狀態元素的不透明度
    'theme-kbd': '#212529', // 鍵盤主題顏色
    'theme-on-kbd': '#FFFFFF', // 鍵盤上的文本顏色
    'theme-code': '#F5F5F5', // 代碼塊主題顏色
    'theme-on-code': '#000000', // 代碼塊中的文本顏色

    // 陰影 | Elevation
    'elevation-level-1': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
    'elevation-level-2': '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
    'elevation-level-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
    'elevation-level-4': '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
    'elevation-level-5': '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',

    // 遮罩 | Overlay
    'overlay-color': 'rgba(0, 0, 0, 0.5)',

    // 圓角 | Corner Radius
    // 頁面組件、選單、頁籤
    rectangle: '0px',
    // 按鈕、輸入框
    'corner-radius-sm': '4px',
    // 卡片、區塊、頁籤、標記
    'corner-radius-md': '8px',
    // FAB
    rounded: '50%'
  }
}

export { customLightTheme }
