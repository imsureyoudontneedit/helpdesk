<template>
  <div class="wrapper mt-4 w-100">
    <h2> Оборудование аудитории {{`${this.binder.name}`}}</h2>
    <router-link :to="`/createEquipment/${$route.params.id}`" class="btn">Добавить оборудование</router-link>
    <div class="generator mt-3">
          <button class="btn btn-sm" @click="showModalToggle">Сгенирировать qr-код</button>
          <div class="qr-modal" v-if="showModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">QR-код</h5>
                </div>
                <div class="modal-body">
                  <qrcode-vue class="qr-code" :value="qr" :size="size"></qrcode-vue>
                </div>
              </div>
            </div>
            </div>
    </div>
    <div class="types d-flex  flex-wrap">
        <div class="dropdown mt-4 ms-4 " v-for="eqType in types" :key="eqType.name">
        <button class="btn btn-secondary dropdown-toggle" type="button" @click='showModalType'>
            {{eqType.name}}
        </button>
        <ul class="dropdown-menu position-relative  text-center ">
            <li class="" v-for="equipmentbyBind in equipment" :key="equipmentbyBind" ><router-link v-if="equipmentbyBind.type.name == eqType.name" class="btn btn-primary mb-2 mx-1 " :to="`/equipmentView/${equipmentbyBind.id}`">{{equipmentbyBind.title}}</router-link>  </li>
            {{equipmentbyBind}}
        </ul>
    </div>
    </div>

    
    
  </div>
</template>

<script>
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'
export default {
    props: {
        binderIDatt: String
    },
    data() {
        return {
            $route: this.$route,
            equipment: [],
            binder: '',
            qr: `http://77.232.44.8:49120/Equipment/Api/Binder/${this.$route.params.id}`,
            showModal: false,
            size: 300,
            types: [],
        }
    },
    methods: {
        async getEquipment(){
            const response = await axios.get('http://77.232.44.8:49120/Equipment/Api/Equipment/?binderId='+`${this.$route.params.id}`+'&skip=0&take=20000000', {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')},
            })
            
            this.binder=response.data[0].binder
            this.equipment = response.data
            // this.getAttachesById()
            // this.binder=response.data.binder

        },
        showModalToggle(){
            this.showModal =!this.showModal;
        },
        async getTypes(){
            await axios.get('http://77.232.44.8:49120/Equipment/Api/EquipmentType?skip=0&take=100', {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')},
            }).then (response=>{
                this.types = response.data
            })
        },
        showModalType(event){
            const menu=event.target.parentElement.querySelector('.dropdown-menu')
            menu.classList.toggle('show')
            menu.querySelectorAll('li').forEach(element => {

                if (element.innerHTML=='<!--v-if-->' || element.innerHTML==''){
                    element.remove();
                }
            });
            if(menu.innerHTML == ' '){
              menu.innerHTML = 'Оборудование отсутствует'
              
            }
        }
    },
    beforeMount() {
        this.getTypes()
    },
    mounted() {
        this.getEquipment();
        
    },
    components: {
        QrcodeVue
    }

}
</script>

<style scoped>
    .btn {
        background-color: #6fbfee;
        border-color: none;
        border-radius: 25px;
    }

    .dropdown-menu.show{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>