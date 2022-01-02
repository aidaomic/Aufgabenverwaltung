import Vuex from 'vuex'
import tasks from './modules/tasks';

const store = new Vuex.Store({
    modules: {
        tasks
    }
})

export default store;