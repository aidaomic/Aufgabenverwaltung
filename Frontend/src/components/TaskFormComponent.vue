<template>
    <div>
        <div class="mb-4">
            <h2>{{formType}} Task</h2>
        </div>
        <form>
            <div class="form-group mb-3">
                <label for="formTaskTitle">Title</label>
                <input v-model="task.title" type="text" class="form-control" id="formTaskTitle" placeholder="Task ...">
            </div>

            <div class="row mb-3">
                <div class="form-group col-6">
                    <label for="formTaskStatus">Status</label>
                    <select v-model="task.status" id="formTaskStatus" class="form-control">
                        <option selected>Idea</option>
                        <option>Todo Next</option>
                        <option>Doing</option>
                        <option>in Review</option>
                        <option>Done</option>
                    </select>

                </div>

                <div class="form-group col-6">
                    <label for="formTaskDate">Due Date</label>
                    <datepicker v-model="task.due" inputFormat="dd. MMM yyyy" class="datepicker form-control bg-white" id="formTaskDate"/>
                </div>
            </div>

            <div class="row mb-3">
                <div class="form-group col-6">
                    <label for="formTaskUrl">URL</label>
                    <input v-model="task.url" type="text" class="form-control" id="formTaskUrl" placeholder="www.example.com">
                </div>

                <div class="form-group col-6">
                    <label for="formTaskContact">Contact</label>
                    <input v-model="task.contact" type="text" class="form-control" id="formTaskContact" placeholder="mail@to.com">
                </div>
            </div>

            <div class="form-group mb-3">
                <label for="formTaskShortDescription">Short Description</label>
                <textarea v-model="task.short_description" class="form-control" id="formTaskShortDescription" rows="2"></textarea>
                <small class="form-text text-muted">The short description will be shown in the task overview.</small>
            </div>

            <div class="form-group mb-3">
                <label for="formTaskLongDescription">Long Description</label>
                <textarea v-model="task.long_description" class="form-control" id="formTaskLongDescription" rows="6"></textarea>
                <small class="form-text text-muted">The long description will be shown in the the detail view of the task.</small>
            </div>

        <button type="submit" class="btn btn-dark float-end">Save</button>
        </form>
    </div>
</template>

<script>
    import store from '../store'
    import Datepicker from 'vue3-datepicker'

    export default {
        name: "TaskEditComponent",
        data() {
            return {
                task: {
                    id: String,
                    title: String,
                    short_description: String,
                    long_description: String,
                    status: String,
                    due: Date,
                    contact: String,
                    url: String
                },

                formType: String 
            }
        },

        components: {
            Datepicker
        },

        created: function() {
            this.fetchData();
        },

        methods: {
            fetchData: function() {
                var taskFromStore = store.getters.getTaskById(this.$route.params.taskId)

                if(taskFromStore != undefined){
                    this.task = taskFromStore
                    this.task.due = new Date(taskFromStore.due)

                    this.formType = "Edit"
                }
                else{
                    this.task = this.getDefaultTask()

                    this.formType = "Add"
                }
            },

            getDefaultTask: function(){
                return {
                    id: "",
                    title: "",
                    short_description: "",
                    long_description: "",
                    status: "",
                    due: new Date(),
                    contact: "",
                    url: ""
                }
            },

            getDate(){
                return new Date();
            }
        }
    }
</script>

<style scoped>
</style>