<template>
  <div>Account</div>
  <v-btn @click="router.push({ name: 'AccountEdit', params: { action: 'view' } })">Edit</v-btn>

  <br />
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped></style>
