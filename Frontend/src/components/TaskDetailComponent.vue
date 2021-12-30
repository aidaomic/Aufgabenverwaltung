<template>
    <div>
        TaskDetailComponent 
        {{getTask()}}
    </div>
</template>

<script>
// import { mapActions } from 'vuex'
import store from '../store'

export default {
    name: "TaskDetailComponent", 
        methods: {
            getTask() {
                return store.getters.getTaskById(this.$route.params.taskId);
            },
        // ...mapActions(["fetchTasks"]),
    },
//   computed: store.getters.getTaskById(2), //mapGetters(["getTaskById"]),
        // created() {
        //     this.fetchTasks();
        // }
};
</script>

<style scoped>

</style>
