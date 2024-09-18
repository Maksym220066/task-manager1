<template>
<div>
  <div>
    <v-text-field
          v-model="dataTask.title"
          variant="underlined"
          autofocus
    />
    <v-textarea
          v-model="dataTask.description"
          label="Description"
    />

    <v-select
          v-model="dataTask.priority"
          label="Priority"
          :items="priorityItems"
    >
      <template #selection="{ item}">
        <AppStatusPriority :priority="item.value" />
      </template>
      <template #item="{ item, props  }">
        <v-list-item v-bind="{...props, title: ''}">
          <AppStatusPriority :priority="item.value" />
        </v-list-item>
      </template>
    </v-select>
    <v-select
          v-model="dataTask.status"
          label="Priority"
          :items="statusItems"
    >
      <template #selection="{ item }">
        <AppStatus :status="item.value" />
      </template>
      <template #item="{ item, props }">
        <v-list-item v-bind="{...props, title: ''}">
          <AppStatus :status="item.value" />
        </v-list-item>
      </template>
    </v-select>

    <v-autocomplete
          v-model="dataTask.responsiblePerson"
          :items="followers"
          color="blue-grey-lighten-2"
          return-object
          label="Responsible person"
          chips
          closable-chips
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
              v-bind="props"
              :prepend-avatar="item.raw.avatar"
              :text="item.raw.name"
        ></v-chip>
      </template>

      <template v-slot:item="{ props, item }">
        <v-list-item
              v-bind="props"
              :prepend-avatar="item.raw.avatar"
              :title="item.raw.name"
        ></v-list-item>
      </template>
    </v-autocomplete>
    <v-autocomplete
          v-model="dataTask.followers"
          :items="followers"
          color="blue-grey-lighten-2"
          return-object
          label="Followers"
          chips
          closable-chips
          multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
              v-bind="props"
              :prepend-avatar="item.raw.avatar"
              :text="item.raw.name"
        ></v-chip>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item
              v-bind="props"
              :prepend-avatar="item.raw.avatar"
              :title="item.raw.name"
        ></v-list-item>
      </template>
    </v-autocomplete>
  </div>
  <div class="actions">
    <v-btn
          color="gray"
          @click="cancelEdit"
    >
      Cancel
    </v-btn>
    <v-btn
          color="green"
          @click="saveNewChanges"
    >
      Save changes
    </v-btn>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Priority, followers, Status, type Task } from "@/stores/tasks";
import AppStatusPriority from "@/components/TaskManager/AppStatusPriority.vue";
import AppStatus from "@/components/TaskManager/AppStatus.vue";

type Props = {
  cardTask: Task | null,
}
type Emits = {
  (event: 'cancel'): void
  (event: 'save', task: Task): void
}

const emits = defineEmits<Emits>()

const props = defineProps<Props>()
const dataTask = ref<Task>({} as Task)

const priorityItems = [Priority.Low, Priority.Medium, Priority.High]
const statusItems = [Status.Todo, Status.InProgress, Status.Done]

onMounted(() => {
  if (props.cardTask) dataTask.value = JSON.parse(JSON.stringify(props.cardTask))
})

const cancelEdit = () => {
  emits('cancel')
}

const saveNewChanges = () => {
  if (!dataTask.value) return
  emits('save', dataTask.value)
}
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  justify-content: end;
  gap: 15px;
}

</style>