- [svg component 使用說明：](#svg-component-使用說明)
  - [Guide](#guide)
    - [前置動作](#前置動作)
    - [如何使用](#如何使用)
    - [Props](#props)
      - [name](#name)
      - [class](#class)
      - [size](#size)

# svg component 使用說明：

## Guide

### 前置動作

1.  #### 先從figma複製的svgCode

2.  #### 將想修改的svg顏色改為 **currentColor**

3.  #### 即可透過color屬性修改svg的顏色

    **以下以person Icon為例:**

    ##### 原始figma複製下來的svgCode長這樣 (不需要修改顏色的icon)：

    ```html
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        stroke="#00979C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ```

    1. **先將想換顏色的 path 或 stroke '標籤上' 的預設顏色拿掉**
    2. **在svg上加上 stroke="currentColor" 或是 fill="currentColor"**
    3. **svg修改大小在這個組件內是無法做到的，會需要針對每個svg內的path或是區塊做個別調整，要製作起來非常複雜，所以此組件大小即為ui輸出的svg大小**
    4. **如果不需要修改顏色的svg就可以不執行上述步驟，直接複製即可**

    ##### 以下為修改過後的svg (需要修改顏色的icon)：

    ```html
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4s853 3 16.5 5.01472 16.5 7.5Z"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    ```

4.  在需要的頁面引入或是全局註冊 Icon.vue檔案，**在props上給name** 會動態讀取放置於svg資料夾中對應的svg（以此專案來說 src/assets/images/icon/\*.svg ）

5.  #### 安裝套件：

    ```bash
    yarn add vite-svg-loader
    ```

6.  #### 套件設定：

    ```javascript
    export default defineConfig({
      plugins: [
        vue(),
        // 其他設定
        svgLoader({
          defaultImport: 'component',
          svgo: false
        })
      ]
    })
    ```

### 如何使用

1.  ```javascript
    // 頁面單獨使用
    import Icon from '@/components/Icon.vue'

    // 全局註冊 main.js
    import Icon from '@/components/Icon.vue'
    app.component('e-icon', Icon)
    ```

---

2.  ```html
    <!-- 頁面單獨使用 -->
    <Icon name="back" class="error" />
    <Icon name="add" class="disabled" />
    <Icon name="person" />

    <!-- 全局註冊 -->
    <e-icon name="back" class="error" />
    <e-icon name="add" class="disabled" />
    <e-icon name="person" />
    ```

---

### Props

該組件接受以下 props：

#### name

- **類型**：`String`
- **必需**：是
- **描述**：指定要使用的svg名稱。

#### class

- **類型**：`String` ['default' | 'error'| 'disabled']
- **必需**：否
- **預設值**：`'default'`
- **描述**：為svg指定 class。

#### size

- **類型**：`String Number`
- **必需**：否
- **預設值**：`24`
- **描述**：為svg指定 寬跟高。

````

```

```
````
