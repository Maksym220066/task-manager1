<template>
<v-layout>
  <AppHeader />
  <v-main>
    <RouterView />
  </v-main>
  <AppDetailCard />
</v-layout>
</template>

<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppDetailCard from "@/components/TaskManager/AppDetailCard.vue";
</script>

<style scoped>
</style>
