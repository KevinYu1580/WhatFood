<template>
  <h2>account edit info</h2>
  <v-btn @click="router.push({ name: 'Account' })">to Account</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped></style>
