<template>
  <div class="modal-overlay" role="dialog" aria-labelledby="modal-title">
    <div class="modal-content">
      <h2 class="modal-title">Create New Todo</h2>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          v-model="title"
          placeholder="Enter todo title..."
          aria-label="Todo Title"
          autofocus
        />
        <p v-if="error" class="error-message">{{ error }}</p>
        <div class="modal-actions">
          <button type="submit" class="create-button">Create</button>
          <button
            type="button"
            class="cancel-button"
            @click="onClose"
            aria-label="Cancel creation"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  onClose: Function,
  onAddTodo: Function,
});

const title = ref('');
const error = ref('');

const handleSubmit = () => {
  if (!title.value.trim()) {
    error.value = 'Todo title cannot be empty.';
    return;
  }

  const newTodo = {
    id: Date.now(),
    title: title.value.trim(),
    completed: false,
  };

  props.onAddTodo(newTodo);
  title.value = '';
  error.value = '';
  props.onClose();
};

watch(title, () => {
  if (error.value) error.value = '';
});
</script>

<style>
@import './CreateTodo.css';
</style>
