<template>
  <div class="wrapper mt-4 ms-5 w-100">
    <h2> Оборудование аудитории {{`${this.binder.name}`}}</h2>
    <router-link :to="`/createEquipment/${this.binder.id}`" class="btn">Добавить оборудование</router-link>
    <div class="d-flex justify-content-center flex-wrap">
        <div class=" ms-3 mb-4" v-for="equipmentbyBind in equipment" :key="equipmentbyBind">
            <div class="card text-center" style="Изображение оборудования">
                <div class="card-body">

            <h5 class="card-title">{{ equipmentbyBind.title }}</h5>

            <router-link class="btn btn-primary " :to="`/equipmentView/${equipmentbyBind.id}`">{{equipmentbyBind.title}}</router-link>
          </div>
        </div>
    </div>
    </div>
    
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            $route: this.$route,
            equipment: [],
            binder: '',
        }
    },
    methods: {
        async getEquipment(){
            const response = await axios.get('http://89.110.53.87:5003/Equipment/Api/Equipment/?binderId='+`${this.$route.params.id}`, {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')},
            })
            
            this.binder=response.data[0].binder
            this.equipment = response.data
            this.getAttachesById()
            // this.binder=response.data.binder

        },
        async getAttachesById(){

            this.equipmentList.forEach((equipment) =>{


              equipment.attaches.forEach(async(attacheID) => {
                await axios.get(`http://89.110.53.87:5003/Equipment/Api/Attach/${attacheID}`, {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')},
                responseType: 'blob'
            }, ).then( (response)=>
            {
                let src=URL.createObjectURL(response.data)
                
                if (!src){
                    src="https://via.placeholder.com/250"
                }
                equipment.imgSrc= src
                console.log(equipment.imgSrc)
            this.attaches.push(response.data)
        })
            })  
            });
                 
        },
    },
    mounted() {
        this.getEquipment()

    }

}
</script>

<style scoped>
    .btn {
        background-color: #6fbfee;
        border-color: none;
        width: max-content;
        border-radius: 25px;
    }
</style>