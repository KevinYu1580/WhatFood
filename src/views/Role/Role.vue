<template>
  <div>Role</div>
  <v-btn @click="router.push({ name: 'RoleEdit', params: { action: 'edit', id: '3' } })"
    >Edit</v-btn
  >
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped></style>
