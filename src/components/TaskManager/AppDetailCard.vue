<template>
<v-navigation-drawer
      v-model="store.controllerStatusCardDetail"
      color="primary"
      location="right"
      temporary
      width="700"
>
  <div
        v-if="card"
        class="card pa-4"
  >
    <div class="card__title">
      <div class="d-flex align-center">
        <h2>Task Details</h2>
        <v-btn
              class="ml-2"
              color="red"
              variant="text"
              icon
              @click="store.removeTask(card.id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <v-btn
            variant="text"
            icon
            @click="store.closeDetailCard"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="card__content-wrapper">
      <div
            v-if="!hasEditModeCard"
            class="card__content"
      >
        <div class="card__content-title">
          <v-btn
                variant="text"
                icon="mdi-pencil"
                @click="openEditModeCard"
          ></v-btn>
          <AppFollower
                v-if="card.responsiblePerson"
                :follower="card.responsiblePerson"
          />
          <h4 class="card__content-title-text">{{ card.title }}</h4>
          <div class="card__content-statuses">
            <AppStatus :status="card.status" />
            <AppStatusPriority
                  v-if="card.priority"
                  :priority="card.priority"
            />
          </div>
        </div>
        <div
              v-if="card.followers && card.followers.length"
              class="card__content-followers"
        >
          <span class="mr-2">Followers:</span>
          <AppFollowers :followers="card.followers" />
        </div>
        <div class="card__content-description">
          <v-divider class="my-4" />
          <div>{{ card.description }}</div>
        </div>
      </div>
      <AppDetailCardEdit
            :card-task="card"
            v-if="hasEditModeCard"
            @cancel="cancelEditTask"
            @save="updateTask"
      />
    </div>
  </div>
</v-navigation-drawer>
</template>

<script setup lang="ts">
import { type Task, useTasksStore } from "@/stores/tasks";
import { computed, ref, watch } from "vue";
import AppStatus from "@/components/TaskManager/AppStatus.vue";
import AppStatusPriority from "@/components/TaskManager/AppStatusPriority.vue";
import AppDetailCardEdit from "@/components/TaskManager/AppDetailCardEdit.vue";
import AppFollower from "@/components/TaskManager/AppFollower.vue";
import AppFollowers from "@/components/TaskManager/AppFollowers.vue";

const store = useTasksStore()

const card = computed<Task | null>(() => store.detailCardData)
const hasEditModeCard = ref<boolean>(false)

watch(() => store.controllerStatusCardDetail, val => {
  if (!val) hasEditModeCard.value = false
})

const openEditModeCard = () => {
  hasEditModeCard.value = true
}

const cancelEditTask = () => {
  hasEditModeCard.value = false
}

const updateTask = (task: Task) => {
  hasEditModeCard.value = false
  store.updateTask(task)

}
</script>

<style scoped lang="scss">
.card {
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    &-wrapper {
      margin-top: 20px;
      margin-left: 20px;
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 10px;

      &-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &-statuses {
      display: flex;
      gap: 5px;
    }
  }
}

</style>