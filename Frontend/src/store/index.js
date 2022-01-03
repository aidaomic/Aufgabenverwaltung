import Vuex from 'vuex'
import tasks from './modules/tasks';
import contacts from './modules/contacts';

const store = new Vuex.Store({
    modules: {
        tasks,
        contacts
    }
})

export default store;