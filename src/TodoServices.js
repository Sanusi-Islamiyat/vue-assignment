export async function fetchTodos() {
    try {
 
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      
   
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
   
      const data = await response.json();
      
      return data;
    } catch (error) {
  
      console.error("Error fetching todos:", error);
      throw error; 
    }
  }
  