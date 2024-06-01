<template>
  <h2>Account edit</h2>
  <v-btn @click="router.push({ name: 'AccountEditSecondlayer', params: { action: 'view' } })"
    >Info</v-btn
  >
  <v-btn @click="router.go(-1)">to Account</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped></style>
