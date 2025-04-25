<template>
  <div class="modal-overlay" role="dialog" aria-labelledby="edit-modal-title">
    <div class="modal-content">
      <h2 id="edit-modal-title">Edit Todo</h2>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          v-model="title"
          placeholder="Edit todo title..."
          aria-label="Edit Todo Title"
          autofocus
        />
        <p v-if="error" class="error-message">{{ error }}</p>
        <div class="modal-actions">
          <button type="submit" class="save-button">Save</button>
          <button
            type="button"
            class="cancel-button"
            @click="onClose"
            aria-label="Cancel edit"
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
  todo: Object,
  onClose: Function,
  onSave: Function,
});

const title = ref(props.todo.title);
const error = ref('');

const handleSubmit = () => {
  if (!title.value.trim()) {
    error.value = 'Todo title cannot be empty.';
    return;
  }

  const updatedTodo = {
    ...props.todo,
    title: title.value.trim(),
  };

  props.onSave(updatedTodo);
  props.onClose();
};

watch(title, () => {
  if (error.value) error.value = '';
});
</script>

<style>
@import './EditTodo.css';
</style>
