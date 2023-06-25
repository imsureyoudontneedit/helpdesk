<template>
  <div class="wrapper  ms-5 mt-4">
    <h2 class="item-title text-align-start">
        Просмотр оборудования {{  }}
    </h2>
    <div class="object_name">
        <strong>Название:</strong> {{ equipment.title + " " + equipment.model}}
    </div>
    <div class="object_audit">
        <strong>Аудитория:</strong> <router-link :to="`/equipmentBinder/${binder.id}`" class="item-audit btn "> {{ binder.name }}</router-link> 
    </div>
    <div class="object_id">
        <strong>Номер предмета:</strong> {{ equipment.id }}
    </div>
    <div class="generator">
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
    <div class="qr-add-stash">
        <button class="btn btn-sm" @click="addQrToStash">Добавить Qr код</button>
    </div>
    <div class="object_container">
        <div class="object_desc_container">
            <strong>Описание и примечания:</strong>
            <div class="object_desc">
                {{ equipment.description }}
            </div>
        </div>
        
        <div class="object_img_container" v-if="imgSrc!=''">
            <div class="object_img">
                <img :src="imgSrc" alt="img" />
            </div>
        </div>
    </div>
    <div class="">
        <button class="btnDelete btn-sm mt-3" @click="deleteEquipment">Удалить оборудование</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'
export default {
    data() {
        return {
            showModal: false,
            $route: this.$route,
            equipment: {},
            attachesID: [],
            attaches: [],
            binder:{},
            size: 200,
            imgSrc:"",
            qr: `http://77.232.44.8:49120/Equipment/Api/Equipment/${this.$route.params.id}`,
            // this.$route.params.id push to localStorage()
        }
    },
    methods: {
        async getEquipmentById(){
            const response = await axios.get(`http://77.232.44.8:49120/Equipment/Api/Equipment/${this.$route.params.id}`, {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')}
            })
            this.equipment = response.data
            this.attachesID = response.data.attaches
            this.binder=response.data.binder
            this.getAttachesById()
            
        },
        async getAttachesById(){

            this.attachesID.forEach(async(attacheID) => {
                await axios.get(`http://77.232.44.8:49120/Equipment/Api/Attach/${attacheID}`, {
                headers: {
                    "Authorization": "Bearer " + this.$cookies.get('accessUserToken')},
                responseType: 'blob'
            }, ).then( (response)=>
            {
            const src=URL.createObjectURL(response.data)
            this.imgSrc=src
            this.attaches.push(response.data)

            })  
            });
                 
        },
        showModalToggle(){
            this.showModal =!this.showModal
        },
        async deleteEquipment() {
            await axios.delete(`http://77.232.44.8:49120/Equipment/Api/Equipment/${this.equipment.id}`,{
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.$cookies.get('accessUserToken')
                }
            }).then((response) => {
                if(response.status == '200')
                    location.assign("/#/equipmentList")
            }) 
            // #/qrPrinter
        },
        addQrToStash(){
            const qrArray = JSON.parse(localStorage.getItem('qrStash')) ? JSON.parse(localStorage.getItem('qrStash')) : {};
            const qrId = this.$route.params.id
            if (qrArray[qrId]){
                return
            }
            // console.log({this.$route.params.id: this.equipment.title})
            
            localStorage.setItem('qrStash', JSON.stringify({...qrArray,  [qrId]: [qrId, this.equipment.title]}))
            
        }
    },
    mounted() {
        this.getEquipmentById();

    },
    components: {
        QrcodeVue,
    },
}
</script>

<style scoped>

.item-audit {
    height: min-content;
    text-align:center;
    width: min-content;
    font-weight: bold;
    border-radius: 12px;
}
.generator button {
    border-radius: 22px;
    font-weight: bold;
}
.qr-modal{
    max-width: 50%;
}
.modal-body{
    text-align:center;
}
.object_container{
    display:flex;
    justify-content: space-between;
    
}
.object_desc{
    border: 1px solid #777;
    padding: 5px;
    width: max(300px,25vw);
    height: 300px;
    overflow-y: auto;
}
.object_img{
    margin-left:25px ;
    width: clamp(300px,45vw,600px);
}
.object_img img{
    width: 100%;
}

.btn {
    background-color: #6fbfee;
    border-color: none;
    width: max-content;
    border-radius: 25px;
}

.btnDelete{
    background-color: #de4141;
    border-color: none;
    width: max-content;
    border-radius: 25px;
    color: white;
}
</style>

