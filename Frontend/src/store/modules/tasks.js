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
                title: 'Task numero zero',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Idea',
                due: '30. Dec 2021',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '1',
                title: 'Task numero uno',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Doing',
                due: '01. Jan 2022',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '2',
                title: 'Task numero due',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Todo Next',
                due: '05. Jan 2022',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '3',
                title: 'Task numero tre',
                short_description: 'short description',
                long_description: 'long description',
                status: 'in Review',
                due: '08. Jan 2022',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '4',
                title: 'Task numero quattro',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Done',
                due: '03. Jan 2022',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '5',
                title: 'Task numero quattro',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Done',
                due: '02. Jan 2022',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '5',
                title: 'Task numero quattro',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Doing',
                due: '02. Jan 2022',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '6',
                title: 'Task numero quattro',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Doing',
                due: '31. Dec 2021',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '7',
                title: 'Task numero quattro',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Doing',
                due: '29. Dec 2021',
                contact: 'mail@to.com',
                url: 'www.exmaple.com'
            },
            {
                id: '8',
                title: 'Task numero quattro',
                short_description: 'short description',
                long_description: 'long description',
                status: 'Doing',
                due: '28. Dec 2021',
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