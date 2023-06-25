<template>
  <div class="wrapper mt-4 ms-5 w-100">
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
    <div class="d-flex justify-content-center flex-wrap">
        <div class=" ms-3 mb-4" v-for="equipmentbyBind in equipment" :key="equipmentbyBind">
            <div class="card text-center" style="">
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
            size: 200,
        }
    },
    methods: {
        async getEquipment(){
            const response = await axios.get('http://77.232.44.8:49120/Equipment/Api/Equipment/?binderId='+`${this.$route.params.id}`, {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')},
            })
            
            this.binder=response.data[0].binder
            this.equipment = response.data
            // this.getAttachesById()
            // this.binder=response.data.binder

        },
        showModalToggle(){
            this.showModal =!this.showModal
        }
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
        width: max-content;
        border-radius: 25px;
    }
</style>