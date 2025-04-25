<template>
  <div>
    <!-- Loading State -->
    <p v-if="loading" class="loading-text">Loading...</p>

    <!-- Main Content -->
    <div v-else class="todos-container">
      <!-- Search Bar -->
      <SearchBar :query="query" @update-query="updateQuery" />

      <!-- Create Todo Button -->
      <button class="create-todo-button" @click="showCreateModal = true">
        <i class="fas fa-plus"></i>
      </button>

      <!-- Filter Dropdown -->
      <div class="filter-dropdown">
        <select v-model="filter">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <!-- Todos List -->
      <div class="todos-list">
        <div
          v-for="todo in currentTodos"
          :key="todo.id"
          :class="['todo-item', { completed: todo.completed, 'not-completed': !todo.completed }]"
          :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
          @click="navigateToDetails(todo.id)"
        >
          <span>{{ todo.title }}</span>

          <!-- Delete Button -->
          <button @click.stop="deleteTodo(todo.id)" class="delete-button">
            <i class="far fa-trash-alt" style="color: #4a3434"></i>
          </button>

          <!-- Edit Button -->
          <button @click.stop="handleEdit(todo)" class="edit-button">
            <i class="far fa-edit" style="color: #c990ab"></i>
          </button>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="page-cont">
        <button class="prev" @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span class="page-num">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button class="next" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>

      <!-- Create Todo Modal -->
      <CreateTodoModal v-if="showCreateModal" @close="showCreateModal = false" @add-todo="addTodo" />

      <!-- Edit Todo Modal -->
      <EditTodoModal
        v-if="editingTodo"
        :todo="editingTodo"
        @close="editingTodo = null"
        @save="saveEditedTodo"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { fetchTodos } from "./TodoServices";  // Correct path to TodoServices.js
import SearchBar from "./SearchBar.vue";
import CreateTodoModal from "./CreateTodo.vue";
import EditTodoModal from "./EditTodo.vue";
import "@fortawesome/fontawesome-free/css/all.min.css"; // For FontAwesome icons

export default {
  components: { SearchBar, CreateTodoModal, EditTodoModal },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const filteredTodos = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const query = ref("");
    const filter = ref("all");
    const showCreateModal = ref(false);
    const editingTodo = ref(null);
    const itemsPerPage = 10;

    // Fetch todos from API or localStorage
    onMounted(() => {
      fetchTodos()
        .then((data) => {
          todos.value = data;
          filteredTodos.value = data;
        })
        .catch((error) => {
          console.error("Failed to fetch todos:", error);
        })
        .finally(() => {
          loading.value = false;
        });
    });

    // Watch query, filter, and todos to update filteredTodos
    watch([query, filter, todos], () => {
      const filtered = todos.value.filter((todo) => {
        const matchesQuery = todo.title.toLowerCase().includes(query.value.toLowerCase());
        const matchesFilter =
          filter.value === "all" ||
          (filter.value === "completed" && todo.completed) ||
          (filter.value === "pending" && !todo.completed);
        return matchesQuery && matchesFilter;
      });
      filteredTodos.value = filtered;
      currentPage.value = 1;
    });

    // Pagination
    const indexOfLastItem = computed(() => currentPage.value * itemsPerPage);
    const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage);
    const currentTodos = computed(() =>
      filteredTodos.value.slice(indexOfFirstItem.value, indexOfLastItem.value)
    );
    const totalPages = computed(() =>
      Math.ceil(filteredTodos.value.length / itemsPerPage)
    );

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const addTodo = (newTodo) => {
      todos.value = [newTodo, ...todos.value];
      showCreateModal.value = false;
    };

    const deleteTodo = (id) => {
      todos.value = todos.value.filter((todo) => todo.id !== id);
    };

    const handleEdit = (todo) => {
      editingTodo.value = todo;
    };

    const saveEditedTodo = (updatedTodo) => {
      todos.value = todos.value.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      editingTodo.value = null;
    };

    const updateQuery = (newQuery) => {
      query.value = newQuery;
    };

    const navigateToDetails = (id) => {
      router.push(`/todo/${id}`);
    };

    return {
      todos,
      filteredTodos,
      currentPage,
      query,
      filter,
      showCreateModal,
      editingTodo,
      currentTodos,
      totalPages,
      nextPage,
      prevPage,
      addTodo,
      deleteTodo,
      handleEdit,
      saveEditedTodo,
      updateQuery,
      navigateToDetails,
      loading,
    };
  },
};
</script>

<style scoped>
@import './TodoList.css'; /* Optional, ensure CSS is scoped for this component */
</style>
