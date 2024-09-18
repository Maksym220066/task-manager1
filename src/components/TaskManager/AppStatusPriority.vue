<template>
<v-chip :color="colorStatus">
  <v-icon class="mr-1">
    mdi-flag
  </v-icon>
  {{ priority }}
</v-chip>
</template>

<script setup lang="ts">
import { Priority } from "@/stores/tasks";
import { computed } from "vue";

type Props = {
  priority: Priority,
}

const props = defineProps<Props>()

const colorStatus = computed<string>(() => {
  switch (props.priority) {
    case Priority.Low:
      return 'green';
    case Priority.Medium:
      return 'orange';
    case Priority.High:
      return 'red';
    default:
      return 'green';
  }
})

</script>