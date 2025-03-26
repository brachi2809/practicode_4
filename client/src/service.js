import axios from 'axios';
// axios.defaults.baseURL = "http://localhost:5073";
axios.defaults.baseURL = "https://server-dyzm.onrender.com";



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

  setCompleted: async(id,item, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    isComplete === true ? isComplete = 1 : isComplete = 0;
    const result = await axios.put(`/items/${id}`, { item, isComplete });
    // const result = await axios.put(`/items/${id}`, { name: todo.name, isComplete });
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
