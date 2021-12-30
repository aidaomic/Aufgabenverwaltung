<template>
  <div id="app" class="container">
      <h1>Task Manager</h1>
    <router-view />
  </div>
</template>

<script>
    export default {
    name: 'App',
    components: {},
    }
</script>

<style lang="scss">
    @import './theme/index.scss';
</style>
