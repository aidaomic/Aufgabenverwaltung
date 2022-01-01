<template>
    <div class="row">
        <div class="col-9">
            <div class="mb-4">
                <h2>{{task.title}}</h2>
            </div>
            

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
        <div class="col-3">
            <button v-on:click="navigateBack()" type="button" class="btn btn-light d-block mb-2 ms-auto"><svg-icon icon="chevron-left"/></button>
            <button type="button" class="btn btn-dark d-block mb-2 ms-auto"><svg-icon icon="pen"/> Edit Task</button>
            <button type="button" class="btn btn-danger text-white d-block mb-2 ms-auto"><svg-icon icon="trash"/> Delete</button>
        </div>
    </div>
</template>

<script>
import store from '../store'
import router from '../router'
import SvgIcon from '../assets/svg-icons/SvgIcon.vue'
import {getDueDateColour, getStatusValues} from '../shared/helpers.js'

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
        navigateBack() {
            router.go(-1)
        },
        StatusClass(status){
            return getStatusValues(status)
        },
        DueDateClass(dueDate){
            return getDueDateColour(dueDate)
        }
    },
};
</script>

<style scoped>

</style>
