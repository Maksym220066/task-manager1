import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const followers = [
    { name: 'Sandra Adams', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', id: 1 },
    { name: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', id: 2 },
    { name: 'Trevor Hansen', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', id: 3 },
    { name: 'Tucker Smith', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', id: 4 },
    { name: 'Britta Holt', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', id: 5 },
]
export type Follower = {
    name: string,
    id: number,
    avatar: string,
}

export enum Status {
    Todo = 'Todo',
    InProgress = 'In progress',
    Done = 'Done',
}

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = ' High'
}

export type Task = {
    id: string,
    title: string,
    description: string,
    responsiblePerson?: Follower,
    followers?: Follower[]
    status: Status,
    priority: Priority | null,
}

export const useTasksStore = defineStore('tasks', () => {
    const generalTasks = ref<Task[]>([])
    
    const todoTasks = computed(() => generalTasks.value.filter(el => el.status === Status.Todo))
    const inProgressTasks = computed(() => generalTasks.value.filter(el => el.status === Status.InProgress))
    const doneTasks = computed(() => generalTasks.value.filter(el => el.status === Status.Done))
    
    const statusDetailCard = ref<boolean>(false)
    const detailCardData = ref<Task | null>(null)
    
    const controllerStatusCardDetail = computed<boolean>({
        get: () => statusDetailCard.value,
        set(value: boolean) {
            if (!value) detailCardData.value = null
            
            statusDetailCard.value = value
        }
    })
    
    const addTask = (task: Task) => {
        generalTasks.value.push(task)
    }
    
    const removeTask = (id: string) => {
        controllerStatusCardDetail.value = false
        generalTasks.value = generalTasks.value.filter(el => el.id !== id)
    }
    
    const updateTask = (task: Task) => {
        generalTasks.value = generalTasks.value.map(el => el.id === task.id ? task : el)
        
        detailCardData.value = task
    }
    const changeStatusById = (id: string, status: Status) => {
        generalTasks.value = generalTasks.value.map(el => el.id === id ? { ...el, status } : el)
    }
    
    const openDetailCard = (task: Task) => {
        controllerStatusCardDetail.value = true
        detailCardData.value = task
    }
    
    const closeDetailCard = () => {
        controllerStatusCardDetail.value = false
    }
    return {
        generalTasks,
        addTask,
        removeTask,
        todoTasks,
        inProgressTasks,
        doneTasks,
        changeStatusById,
        controllerStatusCardDetail,
        openDetailCard,
        detailCardData,
        updateTask,
        closeDetailCard,
    }
})
