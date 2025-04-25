<template>
  <div>
    <main class="main-lay">
      <h2>My Todos</h2>
      <button
        @click="goToErrorPage"
        :style="buttonStyle(86)"
      >
        Error
      </button>

      <button
        @click="goToNotFoundPage"
        :style="buttonStyle(16)"
      >
        404
      </button>
    </main>
    <div class="sidebar">
      <p class="happy">Happy</p>
      <p class="holidays">Holidays</p>
      <img class="gift" src="/christmas.png" alt="Gift" />

      <p class="to-you">Oh Toddles! My little gift to you</p>
    </div>

    <!-- Change TodosList to TodoList -->
    <TodoList />
    
    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import TodoList from "./TodoList.vue";  // Import TodoList (not TodosList)

export default {
  name: 'Layout',
  components: {
    TodoList,  // Register TodoList component
  },
  setup() {
    const router = useRouter();

    const goToErrorPage = () => {
      router.push('/error');
    };

    const goToNotFoundPage = () => {
      router.push('/not-found');
    };

    const buttonStyle = (rightPosition) => ({
      borderRadius: '50%',
      color: '#fff',
      position: 'absolute',
      right: `${rightPosition}px`,
      border: 'none',
      width: '60px',
      height: '60px',
      fontSize: '16px',
      cursor: 'pointer',
    });

    return {
      goToErrorPage,
      goToNotFoundPage,
      buttonStyle,
    };
  },
};
</script>

<style scoped>
@import './Layout.css';
</style>
