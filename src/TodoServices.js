// src/TodoServices.js

// Function to fetch todos from the API
export async function fetchTodos() {
    try {
      // Make an API request to the JSONPlaceholder API (or any other API you prefer)
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the response data as JSON
      const data = await response.json();
      
      // Return the fetched data
      return data;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching todos:", error);
      throw error; // Re-throw the error so that the calling function can handle it
    }
  }
  