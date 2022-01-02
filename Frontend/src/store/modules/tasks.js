import axios from 'axios';
import { SORT_KEYS } from '../../shared/enum/SortKeys';

const state = {
    sort: {"sortBy": 'id', "sortAscending": true},
    filter: [],
    tasks: []
};

const getters = {
  getAllTasks: (state) => {
    return state.tasks
  },
  getTaskById: (state) => (id) => {
    return state.tasks.find(task => task.id === id)
  },

  getAllTasksFilteredAndSorted(state){
        let tasks = [...state.tasks]
        //filter
        if(state.filter.length != 0){
            tasks = tasks.filter(
                function(item) {
                  return this.indexOf(item.status) >= 0;
                },
                state.filter
            );
        }

        //sort
        if(state.sort.sortBy == SORT_KEYS.STATUS){
            let sortingArray = ["Idea", "Todo Next", "Doing", "in Review", "Done"]

            tasks.sort((a,b) => {
                if(sortingArray.indexOf(a.status) > sortingArray.indexOf(b.status)){return 1}
                if(sortingArray.indexOf(a.status) < sortingArray.indexOf(b.status)){return -1}
                return 0
            })
        }

        if(state.sort.sortBy == SORT_KEYS.DUE_DATE){
            tasks.sort((a,b) => { 
                if(new Date(a.due) > new Date(b.due)){return 1}
                if(new Date(a.due) < new Date(b.due)){return -1}
                return 0
            })
        }

        if(!state.sort.sortAscending){
            tasks.reverse()
        }

        return tasks
    },

    getSortingValues: (state) => {
        return state.sort
    },

    getFilterValues: (state) => {
        return state.filters
    },
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
                id: '9',
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
        console.warn("BACKEND OPERATION NOT IMPLEMENTED")

        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTask', id);
    },

    changeSorting({commit}, key) {
        commit('changeSorting', key);
    },

    changeFilter({commit}, filters) {
        commit('changeFilter', filters);
    },
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
    removeTask:(state,id) => state.tasks = state.tasks.filter((task) => task.id !== id),

    changeSorting(state, key) {
        if(key == state.sort.sortBy){
            state.sort.sortAscending = !state.sort.sortAscending
        }
        else{
            state.sort = {"sortBy": key, "sortAscending": true}
        }
    },

    changeFilter(state, filters) {
        state.filter = filters
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};