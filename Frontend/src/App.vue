<template>
    <div id="app" class="container">
        <h1>Task Manager</h1>
        <router-view />
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'App',
        components: {},
        methods: {
            ...mapActions(["fetchTasks"]),
        },
        created() {
            this.fetchTasks();
        }
    }
</script>

<style lang="scss">
    @import './theme/index.scss';
</style>
