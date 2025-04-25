<template>
  <div v-if="isLoading" class="main">
    <img class="santa" :src="santaImage" alt="Santa Loading" />
    <p class="loading">Oh Toddles...</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";


export default {
  name: "LoadingPage",
  setup() {
    const isLoading = ref(true);

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 3000);
    });

    return {
      santaImage,
      isLoading,
    };
  },
};
</script>

<style scoped>
@import './Loading.css';
</style>
