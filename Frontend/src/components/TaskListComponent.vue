<template>
    <div class="row">
        <div class="col-12 mb-3">
            <button v-on:click="navigateAdd()" type="button" class="btn btn-dark float-end"><svg-icon icon="plus"/> New Task</button>
        </div>
         <div class="col-12">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-on:click="navigateDetails(task)" v-for="task in getAllTasks" :key="task.id">
                        <td>{{ task.title }}</td>
                        <td>{{ task.short_description }}</td>
                        <td><span class="status" v-bind:class="StatusClass(task.status)?.colour"><svg-icon v-bind:icon="StatusClass(task.status)?.icon"/> {{ task.status }}</span></td>
                        <td><span class="due-date" v-bind:class="DueDateClass(task.due)">{{ task.due }}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import router from '../router'
import { mapGetters } from 'vuex';
import SvgIcon from '../assets/svg-icons/SvgIcon.vue'
import {getDueDateColour, getStatusValues} from '../shared/helpers.js'

export default {
    name: "TaskListComponent",
    components: {
        SvgIcon
    },
    methods: {
        navigateDetails(task) {
            router.push({ name: 'Details', params: {taskId: task.id}});
        },
        navigateAdd() {
            router.push({ name: 'AddForm'});
        },
        StatusClass(status){
            return getStatusValues(status)
        },
        DueDateClass(dueDate){
            return getDueDateColour(dueDate)
        }
    },
    computed: {
        ...mapGetters(["getAllTasks"])
    }, 
}
</script>

<style scoped>

</style>