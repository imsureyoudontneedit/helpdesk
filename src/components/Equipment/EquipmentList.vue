<template>
  <div class="wrapper mt-5 ms-4 w-100">
    <div class="d-flex flex-wrap justify-content-around">
      <div class="status" v-if="this.status">Идет загрузка...</div>
      <div v-else v-for="equipmentItem in equipmentList" :key="equipmentItem.id" class="mb-4">
          <div class="card text-center" >
            <div class="card-body">
              <img class="card-img-top equipImg" :src="equipmentItem.imgSrc ? equipmentItem.imgSrc : 'https://via.placeholder.com/250'" alt="Изображение оборудования" />
              <h5 class="card-title">{{ equipmentItem.title }}</h5>
              <p>Аудитория: {{equipmentItem.binder.name}}</p>
              <router-link class="btn" :to="`/equipmentView/${equipmentItem.id}`"> Посмотреть оборудование </router-link>
            </div>
          </div>
          
      </div>
        <!-- <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>  v-if="$store.state.page <= pages - 1" 
            <li class="page-item"><a class="page-link" href="#">3</a></li>  v-if="$store.state.page <= pages"  https://www.youtube.com/watch?v=dOeL7F0CCso  
            https://bootstrap-vue.org/docs/components/pagination
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
          https://www.npmjs.com/package/vuejs-paginate-next-
        </nav> -->
        
    </div>
    <paginate v-if="!this.status"
            :initial-page="$store.state.page"
            :page-count="pages"
            :click-handler="changePage"
            :prev-text="'Предыдущая'"
            :next-text="'Следующая'"
            :container-class="'pagination justify-content-center'"
            :page-class="'page-item'"
        >
    </paginate>
  </div>  
  
</template>

<script>
import Paginate from "vuejs-paginate-next";
import axios from 'axios';
    export default {
      data() {
        return {
              equipmentList: [],
              status: true,
              attachesID: [],
              attaches: [],
              pages:null,
              page:this.$store.state.page
            }
        },
      methods: {
        async getEquipmentCount(){
          await axios.get('http://77.232.44.8:49120/Equipment/Api/Equipment?skip=0&take=10000000', {
          headers: {
            "Authorization": "Bearer " + this.$cookies.get('accessUserToken')}
        }).then((response)=>{
          if (response.status==200){
            this.pages = Math.ceil(response.data.length / 20);
          }
        })
        },
        async getEquipment() {
  
          await axios.get('http://77.232.44.8:49120/Equipment/Api/Equipment?skip='+`${(this.$store.state.page-1) * 20}`+'&take=20', {
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
        changePage(){
          switch(event.target.text) {
            case "Предыдущая":
                this.$store.commit('setPage', Number(this.$store.state.page)-1)
                break;
            case "Следующая":
                this.$store.commit('setPage', Number(this.$store.state.page)+1)
                break;
            default:
                this.$store.commit('setPage', Number(event.target.text))
                break;
          }
          localStorage.setItem('page', Number(this.$store.state.page))
          this.getEquipment()
          
        }
      },
      beforeMount() {
        this.getEquipmentCount()
      },
      mounted() {
        localStorage.getItem('page')?this.$store.commit('setPage', Number(localStorage.getItem('page'))) : localStorage.setItem('page', Number(this.$store.state.page))
        this.getEquipment();
        // this.equipmentList = axios.get('http://77.232.44.8:49120/Equipment/Api/Equipment', {
        //   headers: {
        //     "Authorization": "Bearer " + store.state.accessUserToken}
        // }).then((response) => { return response});

      },
      components:{
        paginate: Paginate,
      }
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