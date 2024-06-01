<template>
  <v-btn-toggle class="MyBtnToggle px-1 py-1 ga-2" v-bind="componentProps">
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps || {}"></slot>
    </template>
  </v-btn-toggle>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'

// 定義預設 Vuetify 提供的props
const defaultProps = ref({
  rounded: 'lg',
  mandatory: true,
  density: 'default'
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

<style lang="scss" scoped>
.MyBtnToggle {
  box-shadow: 0px 1px 2px 0px #0000004d;
}
</style>
