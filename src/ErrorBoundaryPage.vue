<template>
  <div>
    <!-- If there's no error, render the content -->
    <slot v-if="!hasError" />
    <!-- If there's an error, render the fallback component -->
    <component :is="fallback" v-if="hasError" />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';

const hasError = ref(false);

// Catch errors and handle them gracefully
onErrorCaptured((error) => {
  console.error('ErrorBoundary caught an error:', error);
  hasError.value = true;
  return false;  // Let Vue handle the rest
});

// Accept `fallback` as a prop (assuming it's a component)
defineProps({
  fallback: Object,  // `fallback` should be a component passed as a prop
});
</script>
