<template>
    <div>
        <div class="row mb-4">
            <div class="col-10">
                <h2>{{formType}} Task</h2>
            </div>

            <div class="col-2">
                <button v-on:click="navigateBack()" type="button" class="btn btn-light d-block mb-2 ms-auto"><svg-icon icon="chevron-left"/></button>
            </div>
        </div>
        
        <form>
            <div class="form-group mb-3">
                <label for="formTaskTitle">Title</label>
                <input v-model="task.title" type="text" class="form-control" id="formTaskTitle" placeholder="Task ...">
            </div>

            <div class="row">
                <div class="form-group col-md-6 col-12 mb-3">
                    <label for="formTaskStatus">Status</label>
                    <select v-model="task.status" id="formTaskStatus" class="form-control">
                        <option selected>Idea</option>
                        <option>Todo Next</option>
                        <option>Doing</option>
                        <option>in Review</option>
                        <option>Done</option>
                    </select>

                </div>

                <div class="form-group col-md-6 col-12 mb-3">
                    <label for="formTaskDate">Due Date</label>
                    <datepicker v-model="task.due" inputFormat="dd. MMM yyyy" class="datepicker form-control bg-white" id="formTaskDate"/>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-6 col-12 mb-3">
                    <label for="formTaskUrl">URL</label>
                    <input v-model="task.url" type="text" class="form-control" id="formTaskUrl" placeholder="www.example.com">
                </div>

                <div class="form-group col-md-6 col-12 mb-3">
                    <label for="formTaskContact">Contact</label>
                    <AutoComplete id="formTaskContact" v-model="task.contact" :suggestions="getAllContactsFiltered" @complete="searchContact($event)" field="email" placeholder="mail@to.com"/>
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

            <button v-on:click="handleFormSubmit(task)" type="submit" class="btn btn-dark float-end btn-md-block">Save</button>
        </form>
    </div>
</template>

<script>
    import store from '../store'
    import router from '../router'
    import Datepicker from 'vue3-datepicker'
    import SvgIcon from '../assets/svg-icons/SvgIcon.vue'
    import { mapActions, mapGetters } from 'vuex';
    import AutoComplete from 'primevue/autocomplete';

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

                formType: String ,
            }
        },

        components: {
            Datepicker,
            AutoComplete,
            SvgIcon
        },

        created: function() {
            this.fetchData();
        },

        methods: {
            ...mapActions(["addTask", "updateTask", "changeContactFilter", "addContact"]),

            navigateBack() {
                router.go(-1)
            },
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
                    status: "Idea",
                    due: new Date(),
                    contact: "",
                    url: ""
                }
            },

            searchContact(event) {
                this.changeContactFilter(event.query)
            },

            handleFormSubmit(task){
                if(typeof task.contact !== 'object'){
                    const contactIndex = this.getAllContacts.findIndex(contact => contact.email == task.contact);
                    if (contactIndex === -1) {
                        this.addContact({email: task.contact})
                    }
                }

                if(this.formType == "Add"){
                    this.addTask(task)
                }

                if(this.formType == "Edit"){
                    this.updateTask(task)
                }

                this.navigateBack()
            }
        },

        computed: {
            ...mapGetters(["getAllContactsFiltered", "getAllContacts"]),
        }, 
    }
</script>

<style scoped>

</style>