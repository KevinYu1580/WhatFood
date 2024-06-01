<template>
  <v-overlay
    v-model="appStore.showLoader"
    disabled
    width="100%"
    height="100%"
    transition="fade-transition"
  >
    <template #default>
      <div class="loader_outer">
        <div class="loader flex_c">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="50px"
            height="70px"
            viewBox="0 0 24 30"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
          >
            <rect x="0" y="10" width="4" height="10" fill="#FFFFFF" opacity="0.2">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="0.2; 1; .2"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                attributeType="XML"
                values="10; 20; 10"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="10; 5; 10"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="8" y="10" width="4" height="10" fill="#FFFFFF" opacity="0.2">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="0.2; 1; .2"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                attributeType="XML"
                values="10; 20; 10"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="10; 5; 10"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="16" y="10" width="4" height="10" fill="#FFFFFF" opacity="0.2">
              <animate
                attributeName="opacity"
                attributeType="XML"
                values="0.2; 1; .2"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                attributeType="XML"
                values="10; 20; 10"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="10; 5; 10"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      </div>
    </template>
  </v-overlay>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
$loaderBgColor: var(--v-overlay-color);

.loader_outer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  background: $loaderBgColor;
  .loader {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.color {
  fill: #fff;
}
</style>
