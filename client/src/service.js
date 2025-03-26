import axios from 'axios';
// axios.defaults.baseURL = "http://localhost:5073";
axios.defaults.baseURL = "https://client-7stx.onrender.com/items";

axios.interceptors.response.use(
  response => response,
  error => {
    console.error("Error in API call:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);
export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name);
    const result = await axios.post(`/items`, {name: name});
    console.log("add");
    
    console.log("add result.data :",result.data);

    return result.data;
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    isComplete === true ? isComplete = 1 : isComplete = 0;
    const result = await axios.put(`/items/${id}`, {  isComplete });
    console.log("set result.data :",result.data);
    return result.data;
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result = await axios.delete(`/items/${id}`);
    console.log("delete result.data :",result.data);
    
    return result.data;
  }
};


// import axios from 'axios';

// axios.defaults.baseURL = "https://client-7stx.onrender.com/";

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     console.error("Error in API call:", error.response?.status, error.message);
//     return Promise.reject(error);
//   }
// );

// const api = {
//   getTasks: async () => {
//     try {
//       const result = await axios.get(`/items`);
//       return result.data;
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       return [];
//     }
//   },

//   addTask: async (name) => {
//     try {
//       console.log('Adding task:', name);
//       const result = await axios.post(`/items`, { name });
//       console.log("Added task:", result.data);
//       return result.data;
//     } catch (error) {
//       console.error("Error adding task:", error);
//       return null;
//     }
//   },

//   setCompleted: async (id, isComplete) => {
//     try {
//       console.log('Updating task:', { id, isComplete });
//       const result = await axios.put(`/items/${id}`, { isComplete });
//       console.log("Updated task:", result.data);
//       return result.data;
//     } catch (error) {
//       console.error("Error updating task:", error);
//       return null;
//     }
//   },

//   deleteTask: async (id) => {
//     try {
//       console.log('Deleting task:', id);
//       const result = await axios.delete(`/items/${id}`);
//       console.log("Deleted task:", result.data);
//       return result.data;
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       return null;
//     }
//   }
// };

// export default api;
