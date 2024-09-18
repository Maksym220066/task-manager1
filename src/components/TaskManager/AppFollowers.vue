<template>
<AppFollower
      v-for="follower in followers"
      :follower="follower"
/>
</template>
<script setup lang="ts">
import type { Follower } from "@/stores/tasks";
import AppFollower from "@/components/TaskManager/AppFollower.vue";

type Props = {
  followers: Follower[]
}
defineProps<Props>()

</script>
