//import axios from 'axios';

const state = {
    contacts: [],
    filter: ''
};

const getters = {
  getAllContacts: (state) => {
    return state.contacts
  },

  getAllContactsFiltered: (state) => {
    if (state.filter.trim().length == 0) {
        return state.contacts;
    }
    
    else {
        let filteredContactList = state.contacts.filter((contact) => {
            return contact.email.toLowerCase().startsWith(state.filter.toLowerCase());
        });

        return filteredContactList
    }
  }
};

const actions = {
    //GET
    async fetchContact({ commit }) {
        // const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        // commit('setTasks', response.data);
        
        const response = [
            {email: "example@mail.com"},
            {email: "mail@to.com"},
            {email: "email@at.com"},
            {email: "unknown@blup.com"},
        ]

        commit('setContacts', response);
    },

    //POST
    async addContact({commit}, contact){
        //TODO: NOT IMPLEMENTED
        console.warn("BACKEND OPERATION NOT IMPLEMENTED")

        // const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`,
        // {title:title,completed:false})

        //commit('addTask', response.data)
        commit('addContact', contact)
    },

    changeContactFilter({commit}, filter) {
        commit('changeContactFilter', filter);
    }
}

const mutations = {
    setContacts: (state, contacts) => (state.contacts = contacts),
    addContact:(state, newContact) => {
        //TODO get id from db
        // const task = {
        //     id: '20',
        //     title: newTask.title,
        //     short_description: newTask.short_description,
        //     long_description: newTask.long_description,
        //     status: newTask.status,
        //     due: formatDateToString(newTask.due),
        //     contact: newTask.contact,
        //     url: newTask.url
        // }

        state.contacts.unshift(newContact)
    },

    changeContactFilter(state, filter) {
        state.filter = filter
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};