import { SORT_KEYS } from '../../shared/enum/SortKeys';
import axios from "axios";

function formatDateToString(value) {
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let formattedDate = value.getDate() + ". " + months[value.getMonth()] + " " + value.getFullYear()

   return formattedDate
}

const state = {
    sort: {"sortBy": 'id', "sortAscending": true},
    filter: [],
    tasks: []
};

const getters = {
  getAllTasks: (state) => {
    return state.tasks
  },
  getTaskById: (state) => {
      return (id) => {
          for(let i = 0; i < state.tasks.length; i++){
              if(state.tasks[i].id == id) {
                  return state.tasks[i]
              }
          }
          //return state.tasks.find(task => task.id === id)
      };
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
        const response = await axios.get('http://localhost:8080/task/all');
       commit('setTasks', response.data);
    },

    //POST
    async addTask(task){
        //TODO: NOT IMPLEMENTED
        //geting contact and adding new conntact not implemented
        //request is working
        await axios.post('http://localhost:8080/task/new', {
            title: task.title,
            short_description: task.short_description,
            long_description: task.long_description,
            status: task.status,
            due: task.due,
            contact: task.contact,
            url: task.url
        })
        
    },

    //PUT
    async updateTask(updatedTask) {
        //TODO: NOT IMPLEMENTED
        console.warn("BACKEND OPERATION NOT IMPLEMENTED")
        //Request should be working
        await axios.put('http://localhost:8080/task/update', updatedTask);

        /*await axios.put('http://localhost:8080/task/update', {
            id: "2",
            title: "Title",
            short_description: "shorty",
            long_description: "long_description",
            status: "Idea",
            due: "2022-05-29",
            contact: "1",
            url: "ww.c0m"
        });*/

        //commit('updateTask', response.data);
        //commit('updateTask', updatedTask);
    },

    //DELETE
    async deleteTask(id) {

        //Request should be working
        await axios.delete(`http://localhost:8080/task/delete/${id}`);
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
    addTask:(state,newTask) => {
        //TODO get id from db
        const task = {
            id: '20',
            title: newTask.title,
            short_description: newTask.short_description,
            long_description: newTask.long_description,
            status: newTask.status,
            due: "2022-10-01",
            contact: newTask.contact,
            url: newTask.url
        }

        state.tasks.unshift(task)
    },
    updateTask: (state, updatedTask) => {
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
    
        if (index !== -1) {
            state.tasks[index] = {
                id: updatedTask.id,
                title: updatedTask.title,
                short_description: updatedTask.short_description,
                long_description: updatedTask.long_description,
                status: updatedTask.status,
                due: formatDateToString(updatedTask.due),
                contact: updatedTask.contact,
                url: updatedTask.url
            }
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