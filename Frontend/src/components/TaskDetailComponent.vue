<template>
    <div>
        <div class="row mb-4">
            <div class="col-10">
                <h2>{{task.title}}</h2>
            </div>

            <div class="col-2">
                <button v-on:click="navigateBack()" type="button" class="btn btn-light d-block mb-2 ms-auto"><svg-icon icon="chevron-left"/></button>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-md-9 col-12">
                <div class="row">
                    <div class="col-6 mb-4">
                        <h3 class="h5">Status</h3>
                        <span class="status" v-bind:class="StatusClass(task.status)?.colour"><svg-icon v-bind:icon="StatusClass(task.status)?.icon"/> {{ task.status }}</span>
                    </div>

                    <div class="col-6 mb-4">
                        <h3 class="h5">Due Date</h3>
                        <span class="due-date" v-bind:class="DueDateClass(task.due)">{{ task.due }}</span>
                    </div>
                </div>


                <div class="mb-4">
                    <h3 class="h5">URL</h3>
                    <span>{{task.url}}</span>
                </div>

                <div class="mb-4">
                    <h3 class="h5">Contact</h3>
                    <span>{{task.contact}}</span>
                </div>

                <div class="mb-4">
                    <h3 class="h5">Description</h3>
                    <span>{{task.long_description}}</span>
                </div>
            </div>

            <div class="col-md-3 col-12">
                <button v-on:click="navigateEdit(task)" type="button" class="btn btn-dark d-block mb-2 ms-auto btn-md-block"><svg-icon icon="pen"/> Edit Task</button>
                <button v-on:click="handleDelete(task.id)" type="button" class="btn btn-danger text-white d-block mb-2 ms-auto btn-md-block"><svg-icon icon="trash"/> Delete</button>
            </div>
    </div>
    </div>
</template>

<script>
import store from '../store'
import router from '../router'
import SvgIcon from '../assets/svg-icons/SvgIcon.vue'
import {getDueDateColour, getStatusValues} from '../shared/helpers.js'
import { mapActions } from 'vuex';


export default {
    name: "TaskDetailComponent",
    data() {
        return {
            task: store.getters.getTaskById(this.$route.params.taskId)
        }
    },
    components: {
        SvgIcon
    },
    methods: {
        ...mapActions(["deleteTask"]),
        navigateBack() {
            router.go(-1)
        },
        navigateEdit(task) {
            router.push({ name: 'EditForm', params: {taskId: task.id}});
        },
        StatusClass(status){
            return getStatusValues(status)
        },
        DueDateClass(dueDate){
            return getDueDateColour(dueDate)
        },

        handleDelete(task){
            this.deleteTask(task)
            this.navigateBack()
        }
    },
};
</script>

<style scoped>

</style>
