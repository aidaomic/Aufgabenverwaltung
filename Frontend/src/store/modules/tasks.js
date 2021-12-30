import axios from 'axios';

const state = {
  tasks: []
};

const getters = {
  getAllTasks: (state) => {
    return state.tasks
  },
  getTaskById: (state) => (id) => {
    return state.tasks.find(task => task.id === id)
  }
};

const actions = {
    //GET
    async fetchTasks({ commit }) {
        // const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        // commit('setTasks', response.data);
        
        const response = [
            {
                id: '0',
                title: 'test title',
                short_description: 'short description',
                long_description: 'long description',
                status: 'enum or so',
                due: '24. Nov 2021',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '1',
                title: 'test title',
                short_description: 'short description',
                long_description: 'long description',
                status: 'enum or so',
                due: '24. Nov 2021',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '2',
                title: 'test title',
                short_description: 'short description',
                long_description: 'long description',
                status: 'enum or so',
                due: '24. Nov 2021',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            }
        ]

        commit('setTasks', response);
    },

    //POST
    async addTodo({commit},title){
        //TODO: NOT IMPLEMENTED
        console.warn("NOT IMPLEMENTED")

        const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`,
        {title:title,completed:false})

        commit('addTask',response.data)
    },

    //PUT
    async updateTodo({ commit }, updatedTask) {
        //TODO: NOT IMPLEMENTED
        console.warn("NOT IMPLEMENTED")

        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTask.id}`, updatedTask);

        commit('updateTask', response.data);
    },

    //DELETE
    async deleteTask({ commit }, id) {
        //TODO: NOT IMPLEMENTED
        console.warn("NOT IMPLEMENTED")

        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTask', id);
    }
}

const mutations = {
    setTasks: (state, tasks) => (state.tasks = tasks),
    addTask:(state,newTask) => state.tasks.unshift(newTask),
    updateTask: (state, updatedTask) => {
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
    
        if (index !== -1) {
          state.tasks.splice(index, 1, updatedTask);
        }
    },
    removeTask:(state,id) => state.tasks = state.tasks.filter((task) => task.id !== id)
};


export default {
    state,
    getters,
    actions,
    mutations
};