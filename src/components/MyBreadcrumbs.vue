<template>
  <v-breadcrumbs :items="breadCrumbs" class="px-0 pt-0 myChrumbs">
    <template #item="{ item, index }">
      <v-breadcrumbs-item :disabled="index === breadCrumbs.length - 1">
        <button @click="router.push({ name: item.href })">
          <span v-if="index != 0"> {{ item.text }}</span>
          <MyIcon v-else name="home" size="24" />
        </button>
      </v-breadcrumbs-item>
    </template>
    <template #divider> ></template>
  </v-breadcrumbs>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const router = useRouter()

const isEqual = (a, b) => {
  return a === b
}

// 從router取得meta.breadcrumb
const breadCrumbs = computed(() => {
  //如果meta中沒有breadcrumb，則返回空陣列
  if (!route.meta.breadcrumb) {
    return []
  }

  // meta.breadChrumb於router.js動態設定
  const myBreadcrumbs = [...route.meta.breadcrumb]

  if (route.params?.action) {
    const index = myBreadcrumbs.findIndex((breadChrumb) => isEqual(breadChrumb.href, route.name))

    if (index < 0) {
      console.error('index尋找失敗，請確認meta.title寫法是否正確')
      return myBreadcrumbs
    }

    const routeName = route.name

    myBreadcrumbs[index].text = `${route.params.action} ${routeName}`
  }

  // 如果目前頁面為首頁，則不推入首頁
  if (route.name === 'Home') {
    return myBreadcrumbs
  }
  myBreadcrumbs.unshift({ text: 'Home', href: 'Home' })
  return myBreadcrumbs
})
</script>

<style lang="scss">
.myChrumbs {
  .v-breadcrumbs-divider {
    color: rgb(var(--v-theme-black-tone-50));
  }
  .v-breadcrumbs-item {
    padding: 0;
    opacity: 1;
    color: rgb(var(--v-theme-black-tone-10));
    @include bodyLG;
    svg {
      color: rgb(var(--v-theme-black-tone-10));
    }
  }
  .v-breadcrumbs-item--disabled {
    color: rgb(var(--v-theme-theme-color-teal));
    svg {
      color: rgb(var(--v-theme-theme-color-teal));
    }
  }
}
</style>
