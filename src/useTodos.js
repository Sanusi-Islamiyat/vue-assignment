import { ref } from 'vue';

export const useTodos = () => {
  const todos = ref([]);
  const error = ref(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      todos.value = await response.json();
    } catch (err) {
      console.error("Error fetching todos:", err);
      error.value = err;
    }
  };

  return {
    todos,
    error,
    fetchTodos,
  };
};
