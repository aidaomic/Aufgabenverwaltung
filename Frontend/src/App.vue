<template>
    <div id="app" class="container">
        <svg-sprite />
        <h1 class="my-5">Task Manager</h1>
        <router-view />
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import SvgSprite from './assets/svg-icons/SvgSprite.vue'

    export default {
        name: 'App',
        components: {
            SvgSprite
        },
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
