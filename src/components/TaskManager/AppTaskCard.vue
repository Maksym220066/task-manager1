<template>
<v-card
      color="primary"
      rounded="xs"
      class="mt-2"
      @click="openDetailCard"
>
  <v-card-title>
    <p class="title">
      {{ taskCard.title }}
    </p>
  </v-card-title>
  <v-card-actions>
    <AppFollower
          v-if="taskCard.responsiblePerson"
          :follower="taskCard.responsiblePerson"
    />
    <AppStatusPriority
          class="ml-auto"
          v-if="taskCard.priority"
          :priority="taskCard.priority"
    />
  </v-card-actions>
</v-card>
</template>

<script setup lang="ts">
import { type Task, useTasksStore } from "@/stores/tasks";
import AppStatusPriority from "@/components/TaskManager/AppStatusPriority.vue";
import AppFollower from "@/components/TaskManager/AppFollower.vue";

type Props = {
  taskCard: Task
}

const props = defineProps<Props>()

const store = useTasksStore()

const openDetailCard = () => {
  store.openDetailCard(props.taskCard)
}
</script>


<style scoped lang="scss">
.title {
  font-size: 16px;
}

:deep(.v-card-title) {
  white-space: unset
}
</style>