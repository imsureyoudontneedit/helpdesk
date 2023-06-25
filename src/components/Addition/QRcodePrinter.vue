<template>
<div class="wrapper">
    <div v-if="QRArray"> 
        <div class="print-me d-flex ">
            <div v-for="qrItem in QRArray" :key="qrItem[0]">
                <div class="qr-modal mx-3">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{qrItem[1]}}</h5>
                    </div>
                    <div class="modal-body">
                    <qrcode-vue class="qr-code" :value="`http://77.232.44.8:5003/Equipment/Api/Equipment/${qrItem[0]}`" :size="size"></qrcode-vue>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
        <div>
            <div class="">
                <button @click="print" class="mx-3 btn btn-success" >Распечатать</button>
                <button @click="clearStorage" class="btn btn-success">Очистить</button>
            </div>
            
            <!-- delete localStorage.test -->
            <!-- window.localStorage.removeItem('name') -->
        </div>
    </div>
    <div v-else>
        <h2 class="mx-2 my-2">Нет QR-кодов для печати, добавьте их через страницу оборудования</h2>
    </div>
</div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
    data() {
        return {
            QRArray: JSON.parse(localStorage.getItem('qrStash'))
        }
    },
    components: {
        QrcodeVue,
    },
    methods: {
        print() {
        window.print();
        },
        clearStorage(){
            localStorage.removeItem('qrStash')
            location.reload();
        }
    },
        // async getEquipmentById(){
        //     const response = await axios.get(`http://77.232.44.8:49120/Equipment/Api/Equipment/${this.$route.params.id}`, {
        //         headers: {
  
      //             "Authorization": "Bearer " + this.$cookies.get('accessUserToken')}
        //     })
        //     this.equipment = response.data
        //     this.attachesID = response.data.attaches
        //     this.binder=response.data.binder
        //     this.getAttachesById()
            
        // },
}
</script>

<style>
    @media print {
        * {
    visibility: hidden !important;
    }
    .print-me, .print-me * {
        visibility: visible !important;
    }
    .print-me{
        position: fixed !important;
        left: 0;
        top: 0;
    }
    }
</style>