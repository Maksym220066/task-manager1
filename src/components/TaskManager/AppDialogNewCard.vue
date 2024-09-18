<template>
<v-dialog
      width="auto"
      v-model="statusDialog">
  <v-card
        required
        color="primary"
        min-width="400"
        title="Add a new card"
  >
    <v-card-item>
      <v-text-field v-model="titleTask" />
    </v-card-item>
    <template v-slot:actions>
      <v-btn

            text="Cancel"
            @click="closeDialog"
      ></v-btn>
      <v-btn
            class="ms-auto"
            text="Save"
            @click="saveCard"
      ></v-btn>
    </template>
  </v-card>
</v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Status } from "@/stores/tasks";

type Emits = {
  (event: 'save', title: string, status: Status): void
}

const emits = defineEmits<Emits>()

const statusDialog = defineModel()
const titleTask = ref<string>('')
const statusCard = ref<Status | null>(null)


const openDialog = (status: Status) => {
  statusCard.value = status
  statusDialog.value = true
}

const closeDialog = () => {
  statusDialog.value = false
  statusCard.value = null
  titleTask.value = ''
}

const saveCard = () => {
  if (titleTask.value) {
    emits('save', titleTask.value, statusCard.value)
  }

  closeDialog()
}

defineExpose({
  openDialog
})
</script>