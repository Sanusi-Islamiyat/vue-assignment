<template>
  <div
    class="modal-overlay"
    role="dialog"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <div class="modal-content">
      <h2 id="modal-title">Todo Details</h2>
      <p id="modal-description">
        View detailed information about the selected todo item.
      </p>
      <p><strong>Title:</strong> {{ todo?.title }}</p>
      <p><strong>Status:</strong> {{ todo?.completed ? "Completed" : "Pending" }}</p>
      <p><strong>Position:</strong> {{ todo?.position ?? "Not Available" }}</p>
      <div class="buttons-container">
        <button
          v-if="todo && !todo.completed"
          class="mark-complete-button"
          @click="handleMarkComplete"
          aria-label="Mark as Complete"
        >
          Mark as Complete
        </button>
        <button
          class="close-button"
          @click="handleClose"
          aria-label="Close Todo Details"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const props = defineProps({
  todos: {
    type: Array,
    required: true
  },
  onClose: {
    type: Function,
    required: true
  },
  onMarkComplete: {
    type: Function,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const todo = ref(null)

const findTodo = () => {
  const id = parseInt(route.params.id)
  todo.value = props.todos.find((t) => t.id === id)
}

onMounted(findTodo)
watch(() => [route.params.id, props.todos], findTodo)

const handleMarkComplete = () => {
  props.onMarkComplete(todo.value.id)
  props.onClose()
}

const handleClose = () => {
  props.onClose()
  router.push('/')
}
</script>

<style scoped>
@import './TodoDetailsModal.css'; /* or inline your styles if preferred */
</style>
