<template>
  <div
    class="myDataTableWrapper"
    :class="{ 'myDataTableWrapper--inner': inner, 'myDataTableWrapper--mobile': mobile }"
  >
    <!-- table本體
  [API說明]
  search: 用來綁定模糊搜尋
  loading: 是否載入中，true時會顯示骨架
  items-per-page: 每頁顯示幾筆資料
  v-model:page: 當前頁數
  no-data-text: 當沒有資料時顯示的文字
  -->
    <v-data-table
      :mobile="mobile"
      :search="search"
      :items-per-page="itemsPerPage"
      v-model:page="nowPage"
      class="myDataTable"
      v-bind="componentProps"
    >
      <template #top>
        <!-- table頂部 -->
        <div class="tableTop" v-if="showTop">
          <div class="tableTop__innerDiv">
            <slot name="tableTop"></slot>
          </div>

          <div class="searchBar">
            <!-- DESCRIPTION
        1. v-model: @string 綁定搜尋框的值
        -->
            <MyInput v-model="search" type="search" placeholder="搜尋" />
          </div>
          <!-- 標題 -->
        </div>
      </template>

      <!-- 傳入所有外部slot -->
      <template v-for="(value, key) in $slots" #[key]="slotProps">
        <slot :name="key" v-bind="slotProps || {}"></slot>
      </template>

      <!-- 自定義header(thead) -->
      <template
        v-for="item in headers"
        #[`header.${item.key}`]="{ column, toggleSort, isSorted, getSortIcon }"
        :key="item.key"
      >
        <div class="d-flex ga-4 align-center" @click="!column.sortable || toggleSort(column)">
          <span>{{ column.title }}</span>

          <div class="d-flex flex-column" v-if="!!column.sortable">
            <!-- 升冪 -->
            <div :class="{ opacity0: getSortIcon(column) != '$sortDesc' && isSorted(column) }">
              <MyIcon name="tableArrow_down" class="white rotate-180" size="10" />
            </div>
            <!-- 降冪 -->
            <div :class="{ opacity0: getSortIcon(column) != '$sortAsc' && isSorted(column) }">
              <MyIcon name="tableArrow_down" class="white opacity0" size="10" />
            </div>
          </div>
        </div>
      </template>

      <!-- 自定義select column樣式(thead) -->
      <template #[`header.data-table-select`]="{ someSelected, selectAll, allSelected }">
        <!-- 將vuetify提供的api與自訂元件做功能綁定 -->
        <MyCheckbox
          :indeterminate="!allSelected && someSelected"
          @update:modelValue="selectAll($event)"
          v-model="selected[0]"
          :value="allSelected"
        />
        <!-- someSelected: {{ someSelected }} <br />
        allSelected: {{ allSelected }} <br />
        v-model: {{ selected[0] }} -->
      </template>

      <!-- 自定義select column樣式(tbody) -->
      <template #[`item.data-table-select`]="{ toggleSelect, item, isSelected }">
        <!-- 將vuetify提供的api與自訂元件做功能綁定 -->
        <MyCheckbox
          :model-value="isSelected(selectObjHander(item))"
          @update:modelValue="toggleSelect(selectObjHander(item))"
        />
      </template>

      <!-- 自定義展開按鈕(tbody) -->
      <template #[`item.data-table-expand`]="{ item, toggleExpand, internalItem }">
        <MyButton
          @click="toggleExpand(internalItem), testFunc()"
          v-if="!!item.Data"
          class="primary"
          variant="outline"
        >
          <template #default>
            <MyIcon name="dropDownArrow" class="primary" />
          </template>
        </MyButton>
      </template>

      <!-- table 底部
    [API說明]
    page: 當前頁數
    pageCount: 總頁數
    -->
      <template #bottom="{ page, pageCount }">
        <div class="tableBottom" v-if="showBottom">
          <!-- 頁數提示 -->
          <div class="tableBottom__indicator">
            顯示 {{ page * itemsPerPage - itemsPerPage + 1 }} 至 {{ page * itemsPerPage }} 筆，共
            {{ items.length }} 筆
          </div>

          <!-- 頁數量調整 -->
          <div class="tableBottom__pageInfo">
            <div>每頁顯示</div>
            <!-- 目前一頁要顯示幾筆資料 -->
            <div class="pageInfo__pageSelect">
              <MySelect v-model="itemsPerPage" :items="[10, 30, 50, 100]" :hide-details="true" />
            </div>

            <div>列</div>
          </div>

          <!-- 頁籤
        [API說明]
        v-model: 當前頁數
        :total-visible: 顯示幾個頁籤
        :length: 總頁數
        -->
          <VPagination v-model="nowPage" :total-visible="6" :length="pageCount"></VPagination>
        </div>
      </template>

      <!--
        DESCRIPTION: 未載入畫面骨架
        1. color: @string 骨架顏色
        2. type: @string 骨架類型
    -->
      <template #loading>
        <VSkeletonLoader
          color="Background-Color"
          :type="`table-row@${itemsPerPage}`"
        ></VSkeletonLoader>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, onMounted, useAttrs, computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

function testFunc() {
  console.log('test')
}

defineOptions({
  inheritAttrs: false
})

// vuetify RWD functions
const { mobile } = useDisplay()

const attrs = useAttrs()

const selected = ref([false])

const props = defineProps({
  // thead data
  headers: {
    type: Array,
    required: true
  },
  // tbody data
  items: {
    type: Array,
    required: true
  },
  'show-top': {
    type: Boolean,
    default: false
  },
  'show-bottom': {
    type: Boolean,
    default: false
  },
  inner: {
    type: Boolean,
    default: false
  }
})

const defaultProps = ref({
  'no-data-text': '查無資料'
})

// 綁定在VDataTable上的props
const componentProps = computed(() => {
  return { ...defaultProps.value, ...attrs, ...props }
})

function selectObjHander(item) {
  return { value: item[componentProps.value['item-value']] }
}

// 搜尋框
const search = ref('')

// 每頁顯示幾筆資料(預設值)
const itemsPerPage = ref(10)

// 當前頁數

const nowPage = ref(1)
</script>

<style scoped lang="scss">
$table_borderRadius: var(--v-corner-radius-sm); // table圓角

$table_tdPadding: 10px; // table td padding

$table_tdHeight: 56px; // table td 高度

$table_theadTextColor: rgb(var(--v-theme-white)); // table td文字顏色
$table_theadTrBGColor: rgb(var(--v-theme-table-header)); // table thead tr背景顏色

$table_tbodyTrBGColor: rgb(var(--v-theme-white)); // table tbody tr背景顏色
$table_tbodyTrBorderColor: rgb(
  var(--v-theme-black-tone-60)
); // table tbody tr border-bottom背景顏色

$table_tbodyTdTextColor: rgb(var(--v-theme-black-tone-20)); // table tbody tr文字顏色

$table_tbodyTrBGColorHover: #f9ffff; // table tbody tr hover背景顏色
$table_tbodyTrBorderColorHover: rgb(
  var(--v-theme-primary-color-dark)
); // table tbody tr hover border-bottom背景顏色

$pagenationBtnColor: rgb(var(--v-theme-theme-color-teal)); // pagination按鈕文字顏色

// 子層table樣式
$innerTable_tbodyTrBGColor: rgb(var(--v-theme-secondary-color-bg)); // table tbody tr背景顏色

$innerTable_theadTextColor: rgb(var(--v-theme-white)); // table tbody tr文字顏色
$innerTable_theadTrBGColor: rgb(var(--v-theme-secondary-color)); // table thead tr背景顏色

// 常用顏色
:deep(.error) {
  color: rgb(var(--v-theme-alert-color-default));
}
:deep(.success) {
  color: rgb(var(--v-theme-security-color-dark));
}
:deep(.warn) {
  color: rgb(var(--v-theme-hightlight-color-dark));
}

.myDataTableWrapper {
  // 搜尋框
  .searchBar {
    width: 200px;
  }
  // table 頂部
  .tableTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    .tableTop__innerDiv {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      margin-right: 16px;
      :deep(.tableTop__title) {
        color: rgb(var(--v-theme-black));
        @include title;
      }
    }
  }

  // table本體
  .myDataTable {
    background: transparent;

    :deep(.v-table__wrapper) {
      border-radius: $table_borderRadius;
      border: 1px solid rgb(var(--v-theme-black-tone-60));

      thead {
        tr {
          background-color: $table_theadTrBGColor;
          color: $table_theadTextColor;

          .innerHeaderWrapper {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          th {
            padding: 8px;
            &:hover {
              color: unset !important; //將vuetify自帶的hover效果取消
            }
          }
        }
      }
      tbody {
        tr {
          transition: 0.3s;
          background-color: $table_tbodyTrBGColor;
          td {
            border-bottom: 1px solid $table_tbodyTrBorderColor !important;
            color: $table_tbodyTdTextColor;
            min-height: $table_tdHeight;
            height: $table_tdHeight;
            word-break: break-all;
            padding: $table_tdPadding;
            @include tableContent;
          }
          // 最後一個td不要border

          &:hover {
            background-color: $table_tbodyTrBGColorHover;
            td {
              border-bottom: 1px solid $table_tbodyTrBorderColorHover !important;
            }
          }
        }
        tr:last-child {
          td {
            border-bottom: none !important;
          }
        }
      }
    }
  }

  // //table 底部
  .tableBottom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 12px;
    .tableBottom__indicator {
      color: rgb(var(--v-theme-black-tone-30));
      @include caption;
    }
    .tableBottom__pageInfo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
      color: rgb(var(--v-theme-black-tone-30));
      @include caption;
      .pageInfo__pageNumSelect {
        width: 90px;
      }
      .pageInfo__pageSelect {
        width: 102px;
      }
    }

    // pagination
    :deep(.v-pagination) {
      .v-pagination__list {
        @mixin paginationBtn() {
          background: rgb(var(--v-theme-white));
          border: 1px solid rgb(var(--v-theme-black-tone-50));
          border-radius: 4px;
          min-width: 36px;

          height: 36px;

          .v-btn {
            color: rgb(var(--v-theme-black-tone-50)) !important;
            width: 100%;
            height: 100%;
          }
        }

        .v-pagination__prev,
        .v-pagination__next,
        .v-pagination__item {
          @include paginationBtn;
        }
        .v-pagination__item--is-active {
          @include paginationBtn;
          background: $pagenationBtnColor;
          border: 1px solid $pagenationBtnColor;
          border-radius: 4px;

          .v-btn {
            color: rgb(var(--v-theme-white)) !important;
          }
        }
      }
    }
  }
}
.myDataTableWrapper--inner {
  .myDataTable {
    :deep(.v-table__wrapper) {
      border-radius: 0;
      border: unset;
      thead {
        tr {
          background-color: $innerTable_theadTrBGColor !important;
          color: $innerTable_theadTextColor;
        }
      }
      tbody {
        tr {
          td {
            border-bottom: 1px solid $table_tbodyTrBorderColor !important;
            background: $innerTable_tbodyTrBGColor;
          }
          &:hover,
          &:not(:hover) {
            background-color: rgb(var(--v-theme-white));

            td {
              border-bottom: 1px solid $table_tbodyTrBorderColor !important;
            }
          }
        }

        tr:last-child {
          td {
            border-bottom: 0 !important;
          }
        }
      }
    }
  }
}

.myDataTableWrapper--mobile {
  .myDataTable {
    :deep(.v-table__wrapper) {
      tbody {
        tr {
          td {
            // display: flex;

            border-bottom: unset !important;

            &:hover,
            &:not(:hover) {
              border-bottom: unset !important;
            }
            > * {
              &:last-child {
                margin-left: auto;
              }
            }
          }
          .v-data-table__td--select-row,
          .v-data-table__td--expanded-row {
            grid-template-columns: auto !important;
            justify-content: flex-end !important;
          }
          outline: 1px solid $table_tbodyTrBorderColor !important;
        }
      }
    }
  }
}

.opacity0 {
  opacity: 0;
}
</style>
