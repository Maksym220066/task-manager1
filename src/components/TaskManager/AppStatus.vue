<template>
<v-chip
      variant="outlined"
      :color="colorStatus"
>
  <v-badge
        :color="colorStatus"
        inline
        dot />
  {{ status }}
</v-chip>
</template>

<script setup lang="ts">
import { Status } from "@/stores/tasks";
import { computed } from "vue";

type Props = {
  status: Status,
}
const props = defineProps<Props>()

const colorStatus = computed<string>(() => {
  switch (props.status) {
    case Status.Todo:
      return 'gray';
    case Status.InProgress:
      return 'green';
    case Status.Done:
      return 'orange';
    default:
      return 'gray';
  }
})
</script>