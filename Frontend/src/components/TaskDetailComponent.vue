<template>
    <div>
        <h2>{{task.title}}</h2>

        <button type="button" class="btn btn-dark"><svg-icon icon="pen"/> Edit Task</button>
        <button type="button" class="btn btn-danger"><svg-icon icon="trash"/> Delete</button>
        <button v-on:click="navigateBack()" type="button" class="btn btn-danger">Go Back</button>

        <h3>Status</h3>
        <span>{{task.status}}</span>

        <h3>Due Date</h3>
        <span>{{task.due}}</span>

        <h3>URL</h3>
        <span>{{task.url}}</span>

        <h3>Contact</h3>
        <span>{{task.contact}}</span>

        <h3>Description</h3>
        <span>{{task.long_description}}</span>
    </div>
</template>

<script>
import store from '../store'
import router from '../router'
import SvgIcon from '../assets/svg-icons/SvgIcon.vue'

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
        }
    },
};
</script>

<style scoped>

</style>
