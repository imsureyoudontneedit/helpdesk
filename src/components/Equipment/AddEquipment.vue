<template binderId="binderIDatt">
<div class="cont">
    <div class="header"><h2>Добавить оборудование</h2></div>
    <div class="formWrapper">
        <form class="" @submit.prevent='createEquipment'>
            <div>
                <div class="form-floating">
                    <select class="mb-3 form-select form-select-lg" v-model="type">
                        <option value="1">test</option>
                    </select>
                        <label>Тип оборудования</label>
                </div>
            </div>
            <div>
                <div class="mb-3 form-floating">
                    <input placeholder="Title" type="label" class="form-control" v-model="title">
                    <label>Title equipment</label>
                </div>
            </div>
            <div>
                <div class="mb-3 form-floating">
                    <textarea placeholder="Description" class="form-control" v-model="description"></textarea>
                    <label>Direction</label>
                </div>
            </div>
            <div class="mb-3">
                <input type="date" style="width: 280px;" v-model="date">
            </div>
            <div>
                <div class="mb-3 form-floating">
                    <input placeholder="Responsible Name" type="label" class="form-control" v-model="model">
                    <label>Model</label>
                </div>
            </div>
            <div>
                <input placeholder="file" type="file" class="mb-3 form-control form-control-lg" ref="file" @change="handleFileUpload( $event )">
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</div>    
</template>

<script>
import axios from 'axios'
export default {
    
    data() {
        return {
                type: '',
                title: '',
                description: '',
                date: '',
                model: '',
            equipmentId: '',
            binderId: '',
            file: ''
        }
    },
    methods: {
        async createEquipment() {
            
            await axios.post('http://89.110.53.87:5003/Equipment/Api/Equipment', {
                title: this.title,
                description: this.description,
                purchaseDate: this.date,
                model: this.model,
                typeId: this.type,
                binderId: this.$binderIdatt
            },{
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.$cookies.get('accessUserToken')
                }
            })
            .then((response)=>{  
                return this.equipmentId = response.data;
            });
            
            let formData = new FormData();
                // console.log(formData);
            formData.append("File", this.file)
            formData.append("EquipmentId", this.equipmentId)

            await axios.post('http://89.110.53.87:5003/Equipment/Api/Attach', formData, {headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + this.$cookies.get('accessUserToken')
            }}).then((response) => {
                console.log(response.status)
            }) 
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        }
    }
}
</script>

<style scoped>
 .cont {
    margin: auto auto;
 }
</style>