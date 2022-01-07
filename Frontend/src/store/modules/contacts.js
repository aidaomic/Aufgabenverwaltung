import axios from 'axios';

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
            return contact.toLowerCase().startsWith(state.filter.toLowerCase());
        });

        return filteredContactList
    }
  }
};

const actions = {
    
    //GET
    async fetchContactById(mail){
        //TODO
        //to get Contact for new Task 
        const response = await axios.get('http://localhost:8080/contact/'+mail);
        console.log(response.data)
        return response.data[0]
    },
    
    //GET
    async fetchContact({ commit }) {
        //Request Working
       const response = await axios.get('http://localhost:8080/contact/all');
        /*const response = [
            {email: "example@mail.com"},
            {email: "mail@to.com"},
            {email: "email@at.com"},
            {email: "unknown@blup.com"},
        ]*/

        commit('setContacts', response.data);
    },

    //POST
    async addContact(newContact){
        //TODO: NOT IMPLEMENTED

        //Request should be working
         await axios.post('http://localhost:8080/contact/new',
             {
                 contact_id: '20',
                e_mail: newContact.e_mail,
                first_name: newContact.first_name,
                last_name: newContact.last_name,
                phone_number: newContact.phone_number
             }
            )
    },

    changeContactFilter({commit}, filter) {
        commit('changeContactFilter', filter);
    }
}

const mutations = {
    setContacts: (state, contacts) => (state.contacts = contacts),
    addContact:(state, newContact) => {
        //TODO get id from db
         /*const contact = {
             contact_id: '20',
             e_mail: newContact.e_mail,
             first_name: newContact.first_name,
             last_name: newContact.last_name,
             phone_number: newContact.phone_number
         }*/
         

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