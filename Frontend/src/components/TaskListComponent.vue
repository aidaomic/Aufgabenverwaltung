<template>
    <div>
        <button type="button" class="btn btn-dark">New Task</button>
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
                <tr v-on:click="navigateDetails(task)" v-for="task in mockTasks" :key="task.id">
                    <td>{{ task.title }}</td>
                    <td>{{ task.short_description }}</td>
                    <td>{{ task.status }}</td>
                    <td>{{ task.due }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import router from '../router'

export default {
    name: "TaskListComponent",
    data() {
        return {
            mockTasks: [
                {
                    id: 0,
                    title: 'test title',
                    short_description: 'short description',
                    long_description: 'long description',
                    status: 'enum or so',
                    due: '24. Nov 2021',
                    contact: 'mail@to.com',
                    url: 'www.exmaple.com'
                },
                {
                    id: 1,
                    title: 'test title',
                    short_description: 'short description',
                    long_description: 'long description',
                    status: 'enum or so',
                    due: '24. Nov 2021',
                    contact: 'mail@to.com',
                    url: 'www.exmaple.com'
                },
                {
                    id: 2,
                    title: 'test title',
                    short_description: 'short description',
                    long_description: 'long description',
                    status: 'enum or so',
                    due: '24. Nov 2021',
                    contact: 'mail@to.com',
                    url: 'www.exmaple.com'
                }
            ]
        }
    },
    methods: {
        navigateDetails(task) {
            router.push({ name: 'Details', params: {taskId: task.id}});
        }
    }
}
</script>

<style scoped>

</style>