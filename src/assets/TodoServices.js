// src/TodoServices.js
export async function fetchTodos() {
    // Dummy data or replace with API call
    return Promise.resolve([
      { id: 1, title: "Learn Vue", completed: false },
      { id: 2, title: "Build a Todo App", completed: true },
    ]);
  }
  