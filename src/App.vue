<template>
  <div>
    <LoadingPage v-if="isLoading" />
    <ErrorBoundary v-else :fallback="ErrorPage">
      <router-view />
    </ErrorBoundary>
  </div>
</template>


<script>
import { ref, onMounted, provide } from "vue";
import ErrorBoundary from "./ErrorBoundaryPage.vue";
import ErrorPage from "./ErrorPage.vue";
import LoadingPage from "./LoadingPage.vue";


export default {
  components: {
    ErrorBoundary,
  },
  setup() {
    const todos = ref([]);
    const isLoading = ref(true);

    const fetchTodos = () => {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.value = storedTodos;
      isLoading.value = false;
    };

    onMounted(() => {
      setTimeout(fetchTodos, 1000);
    });

    const onMarkComplete = (id) => {
      const updated = todos.value.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      );
      todos.value = updated;
      localStorage.setItem("todos", JSON.stringify(updated));
    };

    const onClose = () => console.log("Closing modal");

    
    provide("todos", todos);
    provide("isLoading", isLoading);
    provide("onMarkComplete", onMarkComplete);
    provide("onClose", onClose);

    return { ErrorPage };
  },
};
</script>

<style scoped>
@import './App.css';
</style>

