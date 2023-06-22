<template binderId="binderIDatt">
<div class="cont">
    <div class="header"><h2>Добавить оборудование</h2></div>
    <div class="formWrapper">
        <form class="" @submit.prevent='createEquipment'>
            <div>
                <div class="form-floating">
                    <select class="mb-3 form-select form-select-lg" v-model="type">
                        <option v-for="(item, id) in equipmentType" :key="id" :value="`${item.id}`">
                            {{item.name}}
                        </option>
                    </select>
                        <label>Тип оборудования</label>
                </div>
            </div>
            <div>
                <div class="mb-3 form-floating">
                    <input placeholder="Title" type="label" class="form-control" v-model="title">
                    <label>Название</label>
                </div>
            </div>
            <div>
                <div class="mb-3 form-floating">
                    <textarea placeholder="Description" class="form-control" v-model="description"></textarea>
                    <label>Описание</label>
                </div>
            </div>
            <div class="mb-3">
                <input type="date" style="width: 280px;" v-model="date">
            </div>
            <div>
                <div class="mb-3 form-floating">
                    <input placeholder="Responsible Name" type="label" class="form-control" v-model="model">
                    <label>Модель</label>
                </div>
            </div>
            <div>
                <input placeholder="file" type="file" class="mb-3 form-control form-control-lg" ref="file" @change="handleFileUpload( $event )">
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
        <modal-window :show="showModal" @close="showModal = false">
            <template #header>
                <h3>Оборудование добавлено</h3>
            </template>
            <template #body>
                <p>Вы будете перемещены на страницу оборудования</p>
            </template>
    </modal-window>
    </div>
</div>    
</template>

<script>
import axios from 'axios'
import ModalWindow from '@/components/Addition/ModalWindow'
export default {
    
    data() {
        return {
                type: '',
                title: '',
                description: '',
                date: '',
                model: '',
            equipmentId: '',
            binder: this.$route.params.id,
            file: '',
            showModal: false,
            equipmentType: {}
        }
    },
    methods: {
        // http://banaworld.ru:5003/Equipment/Api/EquipmentType?skip=0&take=50
        async getEquipmentType() {
            await axios.get('http://banaworld.ru:5003/Equipment/Api/EquipmentType?skip=0&take=50',{ 
            headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')
            }},)
            .then((response)=>{
                this.equipmentType = response.data;
            })
        },
        async createEquipment() {
            console.log()
            await axios.post('http://89.110.53.87:5003/Equipment/Api/Equipment', {
                title: this.title,
                description: this.description,
                purchaseDate: this.date,
                model: this.model,
                typeId: this.type,
                binderId: this.$route.params.id
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
                if(response.status == '200') {
                    this.showModal = true
                    console.log(response.data)
                    // location.assign(`/#/equipmentView/${this.equipmentId}`)
                }
            }) 
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        }
    },
    components: {
        ModalWindow
    },
    mounted() {
        this.getEquipmentType()
    }
}
</script>

<style scoped>
 .cont {
    margin: auto auto;
 }
</style>