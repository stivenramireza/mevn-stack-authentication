<template>
    <div class="container">
        <h1>Grades</h1>
        <b-alert
            :show="dismissCountDown"
            dismissible
            :variant="message.color"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            >
            {{message.text}}
        </b-alert>
        <form @submit.prevent="updateGrade(updatedGrade)" v-if="update">
            <h3>Update grade</h3>
            <input type="text" class="form-control my-2" 
                    placeholder="Name" v-model="updatedGrade.name">
            <input type="text" class="form-control my-2" 
                    placeholder="Description" v-model="updatedGrade.description">
            <b-button class="btn-warning my-2 mx-2" type="submit">Confirm</b-button>
            <b-button class="my-2" type="submit" @click="update = false">Cancel</b-button>
        </form>
        <form @submit.prevent="addGrade()" v-if="!update">
            <h3>Add new grade</h3>
            <input type="text" class="form-control my-2" 
                    placeholder="Name" v-model="grade.name">
            <input type="text" class="form-control my-2" 
                    placeholder="Description" v-model="grade.description">
            <b-button class="btn-success my-2 btn-block" type="submit">Add</b-button>
        </form>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in grades" :key="index">
                <th scope="row">{{ item._id }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>
                    <b-button @click="deleteGrade(item._id)" 
                    class="btn-danger mx-2">Delete</b-button>
                    <b-button @click="activateEdition(item._id)" 
                    class="btn-warning">Update</b-button>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            grades: [],
            message: {color: '', text: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            grade: {name: '', description: ''},
            update: false,
            updatedGrade: {}
        }
    },
    created() {
        this.listGrades();
    },
    methods: {
        alert(){
            this.message.color = 'success'
            this.message.text = 'Proofing alert'
            this.showAlert(); 
        },
        listGrades(){
            this.axios('/grade')
            .then(res => {
                console.log(res.data);
                this.grades = res.data;
            })
            .catch(e => {
                console.log(e.response);
            })
        },
        addGrade(){
            console.log(this.grade);
            this.axios.post('/new-grade', this.grade)
            .then(res => {
                this.grades.push(res.data)
                this.grade.name = ''
                this.grade.description = ''
                this.message.color = 'success'
                this.message.text = 'Added grade'
                this.showAlert()
            })
            .catch(e => {
                console.log(e.response);
                if(e.response.data.error.errors.name.message){
                    this.message.text = e.response.data.error.errors.name.message
                }else{
                    this.message.text = 'System error'
                }
                this.message.color = 'danger'
                this.showAlert()
            })
        },
        deleteGrade(id){
            console.log(id)
            this.axios.delete(`/grade/${id}`)
                .then(res => {
                    const index = this.grades.findIndex(item => item._id === res.data._id)
                    this.grades.splice(index, 1)
                    this.message.color = 'success'
                    this.message.text = 'Deleted grade'
                    this.showAlert()
                })
                .catch(e => {
                    console.log(e.response);
                })
        },
        activateEdition(id){
            this.update = true;
            console.log(id);
            this.axios.get(`/grade/${id}`)
                .then(res => {
                    this.updatedGrade = res.data;
                })
                .catch(e => {
                    console.log(e.response)
                })
        },
        updateGrade(item){
            this.axios.put(`/grade/${item._id}`, item)
                .then(res => {
                    const index = this.grades.findIndex(grade => grade._id === res.data._id);
                    this.grades[index].name = res.data.name;
                    this.grades[index].description = res.data.description;
                    this.message.color = 'success'
                    this.message.text = 'Updated grade'
                    this.showAlert()
                    this.update = false; 
                })
                .catch(e => {
                    console.log(e.response)
                })
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    },
}
</script>