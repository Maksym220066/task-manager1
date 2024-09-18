<template>
<v-avatar size="30">
  <v-img
        :alt="follower.name"
        :src="follower.avatar"
  ></v-img>
</v-avatar>
</template>

<script setup lang="ts">
import type { Follower } from "@/stores/tasks";

type Props = {
  follower: Follower,
}
defineProps<Props>()
</script>
