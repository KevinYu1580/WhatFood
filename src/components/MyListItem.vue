<template>
  <v-list-item v-bind="defaultProps" />
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'

// 定義預設 Vuetify 提供的props
const defaultProps = ref({
  color: 'primary-color'
})

const attrs = useAttrs()

const props = defineProps({})

const componentProps = computed(() => {
  return {
    ...defaultProps.value, //預設 Vuetify 提供的props
    ...attrs, //外部傳入的props
    ...props
  }
})
</script>

<style lang="scss" scoped></style>
