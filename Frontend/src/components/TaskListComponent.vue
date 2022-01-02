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
                        <th v-on:click="changeSorting('status')" scope="col">Status
                            <svg-icon class="text-primary" v-if="getSortingValues.sortBy == 'status' && getSortingValues.sortAscending" icon="arrow-down"/> 
                            <svg-icon class="text-primary" v-else-if="getSortingValues.sortBy == 'status' && !getSortingValues.sortAscending" icon="arrow-up"/> 
                            <svg-icon class="text-secondary" v-else icon="switch-vertical"/>
                        </th>
                        <th v-on:click="changeSorting('dueDate')" scope="col">Due Date
                            <svg-icon class="text-primary" v-if="getSortingValues.sortBy == 'dueDate' && getSortingValues.sortAscending" icon="arrow-down"/> 
                            <svg-icon class="text-primary" v-else-if="getSortingValues.sortBy == 'dueDate' && !getSortingValues.sortAscending" icon="arrow-up"/> 
                            <svg-icon class="text-secondary" v-else icon="switch-vertical"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-on:click="navigateDetails(task)" v-for="task in getAllTasksSorted" :key="task.id">
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
import { mapGetters, mapActions } from 'vuex';
import SvgIcon from '../assets/svg-icons/SvgIcon.vue'
import {getDueDateColour, getStatusValues} from '../shared/helpers.js'

export default {
    name: "TaskListComponent",
    components: {
        SvgIcon
    },
    // data(){
    //     return {
    //     }
    // },
    methods: {
        ...mapActions(["changeSorting"]),
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
        },
    },
    
    computed: {
        ...mapGetters(["getAllTasks", "getAllTasksSorted", "getSortingValues"]),
    }, 
}
</script>

<style scoped>

</style>