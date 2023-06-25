<template>
  <div class="wrapper mt-5 ms-4 d-flex flex-wrap justify-content-center">
    <div class="status" v-if="this.status">Идет загрузка...</div>
    <div v-else v-for="equipmentItem in equipmentList" :key="equipmentItem.id" class="mb-4 ms-3">

       
        <div class="card text-center ms-3 mb-4" >
          <div class="card-body">
            <img class="card-img-top equipImg" :src="equipmentItem.imgSrc ? equipmentItem.imgSrc : 'https://via.placeholder.com/250'" alt="Изображение оборудования" />
            <h5 class="card-title">{{ equipmentItem.title }}</h5>
            <p>Аудитория: {{equipmentItem.binder.name}}</p>
            <router-link class="btn" :to="`/equipmentView/${equipmentItem.id}`"> Посмотреть оборудование </router-link>
          </div>
        </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
    export default {
      data() {
        return {
              equipmentList: [],
              status: true,
              attachesID: [],
              attaches: [],

            }
        },
      methods: {
        async getEquipment() {
  
          await axios.get('http://77.232.44.8:49120/Equipment/Api/Equipment', {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('accessUserToken')}
        })
        .then((response) => {
          if(response.status == '200') {
              this.status = false;
              this.equipmentList= response.data

              this.getAttachesById()
              
          }
        })
        
        },
        async getAttachesById(){

            this.equipmentList.forEach((equipment) =>{


              equipment.attaches.forEach(async(attacheID) => {
                await axios.get(`http://77.232.44.8:49120/Equipment/Api/Attach/${attacheID}`, {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')},
                responseType: 'blob'
            }, ).then( (response)=>
            {
                let src=URL.createObjectURL(response.data)

                equipment.imgSrc= src

                
            this.attaches.push(response.data)
        })
            })  
            });

                 
        },
      },
       mounted() {
        this.getEquipment();
        // this.equipmentList = axios.get('http://77.232.44.8:49120/Equipment/Api/Equipment', {
        //   headers: {
        //     "Authorization": "Bearer " + store.state.accessUserToken}
        // }).then((response) => { return response});

      },
};
</script>

<style scoped>
  .equipImg {
    height: 150px;
    width: 200px;
  }

  .btn {
    background-color: #6fbfee;
    border-color: none;
    width: max-content;
    border-radius: 25px;
  }
</style>