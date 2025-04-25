<template>
  <div>
    
    <slot v-if="!hasError" />
  
    <component :is="fallback" v-if="hasError" />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';

const hasError = ref(false);


onErrorCaptured((error) => {
  console.error('ErrorBoundary caught an error:', error);
  hasError.value = true;
  return false;  
});


defineProps({
  fallback: Object, 
});
</script>
