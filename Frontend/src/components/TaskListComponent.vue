<template>
    <div class="row">
        <div class="bg-dark col-3 p-5">
            <div class="form-check deep-purple">
                <input class="form-check-input" type="checkbox" id="checkbox-idea" value="Idea" v-model="checkedFilters" v-on:change="changeFilter(checkedFilters)">
                <label class="form-check-label" for="checkbox-idea"><svg-icon icon="bulb"/> Idea</label>
            </div>

            <div class="form-check pink">
                <input class="form-check-input" type="checkbox" id="checkbox-todo-next" value="Todo Next" v-model="checkedFilters" v-on:change="changeFilter(checkedFilters)">
                <label class="form-check-label" for="checkbox-todo-next"><svg-icon icon="clipboard-list"/> Todo Next</label>
            </div>

            <div class="form-check orange">
                <input class="form-check-input" type="checkbox" id="checkbox-doing" value="Doing" v-model="checkedFilters" v-on:change="changeFilter(checkedFilters)">
                <label class="form-check-label" for="checkbox-doing"><svg-icon icon="writing"/> Doing</label>
            </div>

            <div class="form-check blue">
                <input class="form-check-input" type="checkbox" id="checkbox-in-review" value="in Review" v-model="checkedFilters" v-on:change="changeFilter(checkedFilters)">
                <label class="form-check-label" for="checkbox-in-review"><svg-icon icon="question-mark"/> in Review</label>
            </div>

            <div class="form-check teal">
                <input class="form-check-input" type="checkbox" id="checkbox-done" value="Done" v-model="checkedFilters" v-on:change="changeFilter(checkedFilters)">
                <label class="form-check-label" for="checkbox-done"><svg-icon icon="check"/> Done</label>
            </div>
        </div>

         <div class="col-9">
             <button v-on:click="navigateAdd()" type="button" class="btn btn-dark float-end"><svg-icon icon="plus"/> New Task</button>

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
                    <tr v-on:click="navigateDetails(task)" v-for="task in getAllTasksFilteredAndSorted" :key="task.id">
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
    data(){
        return {
            checkedFilters: []
        }
    },
    methods: {
        ...mapActions(["changeSorting", "changeFilter"]),
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
        ...mapGetters(["getAllTasks", "getAllTasksFilteredAndSorted", "getSortingValues"]),
    }, 
}
</script>

<style scoped>

</style>