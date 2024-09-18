<template>
<div class="task-boards">
  <app-dialog-new-card
        @save="addNewCard"
        ref="dialogCard"
  />
  <v-card
        v-for="board in taskBoards"
        class="task-boards__board"
        @ondragenter.prevent
        @dragover.prevent
        @drop="onDrop($event, board.status)"
  >
    <div
          :class="'bg-' + board.color"
          class="task-boards__board-indicator">

    </div>
    <v-card-title>
      <h4>{{ board.title }}</h4>
    </v-card-title>
    <div class="task-boards__board-content">
      <div class="task-boards__board-cards">
        <AppTaskCard
              v-for="task in board.tasks"
              :draggable="true"
              :task-card="task"
              @dragstart="onDragStart($event, task.id)"
        />
      </div>
      <div class="task-boards__board-actions">
        <v-btn
              variant="text"
              @click="openDialogTask(board.status)"
        >
          + Add a card
        </v-btn>
      </div>
    </div>
  </v-card>
</div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import { Status, type Task, useTasksStore } from "@/stores/tasks";
import AppTaskCard from "@/components/TaskManager/AppTaskCard.vue";
import AppDialogNewCard from "@/components/TaskManager/AppDialogNewCard.vue";
import { v4 as uuidv4 } from 'uuid';
import { storeToRefs } from "pinia";

type DialogType = InstanceType<typeof AppDialogNewCard>


type Board = {
  title: string,
  color: string,
  tasks: Task[]
  status: Status,
}

const store = useTasksStore()

const {
  inProgressTasks,
  todoTasks,
  doneTasks,
} = storeToRefs(store)

const taskBoards = computed<Board[]>(() => {
  return [
    {
      title: 'To Do',
      color: 'gray',
      tasks: todoTasks.value,
      status: Status.Todo
    },
    {
      title: 'In Progress',
      color: 'green',
      tasks: inProgressTasks.value,
      status: Status.InProgress
    }, {
      title: 'Done',
      color: 'orange',
      tasks: doneTasks.value,
      status: Status.Done
    },
  ]
})

const dialogCard = useTemplateRef<DialogType>('dialogCard')

const onDragStart = (event: DragEvent, id: string) => {
  if (!event.dataTransfer) return

  event.dataTransfer?.setData('itemId', id)
}

const onDrop = (event: DragEvent, status: Status) => {
  if (!event.dataTransfer) return

  const id = event.dataTransfer.getData('itemId')

  store.changeStatusById(id, status)
}

const openDialogTask = (status: Status) => {
  if (!dialogCard.value) return

  dialogCard.value.openDialog(status)
}

const addNewCard = (title: string, status: Status) => {
  const newCard: Task = {
    id: uuidv4(),
    title,
    status,
    description: '',
    priority: null,
  }

  store.addTask(newCard)
}
</script>

<style scoped lang="scss">
.task-boards {
  padding: 20px;
  display: flex;
  gap: 10px;
  height: 90vh;

  &__board {
    width: 280px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  &__board-indicator {
    height: 5px;
    width: 100%;
  }

  &__board-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  &__board-cards {
    overflow: auto;
    margin-bottom: 20px;
  }

  &__board-actions {
    margin-top: auto;
  }
}

</style>