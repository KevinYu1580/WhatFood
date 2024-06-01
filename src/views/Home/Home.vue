<template>
  <h2>WELCOME</h2>

  <p>appStore.showSidebar {{ appStore.showSidebar }}</p>
  <p>appStore.sidebarSetting {{ appStore.sidebarSetting }}</p>
  <p>appStore.sidebarWidth {{ appStore.sidebarWidth }}</p>

  <pre>
    {{ { xs, sm, md, lg, xl, xxl } }}
  </pre>

  <pre>{{ thresholds }}</pre>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { useDisplay } from 'vuetify/lib/framework.mjs'
const { xs, sm, md, lg, xl, xxl, thresholds } = useDisplay()

const appStore = useAppStore()
</script>
