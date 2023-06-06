<template>
  <div class="wrapper  w-100 d-flex">
    <form action="" @submit.prevent="createAudience" class="w-50">
        <div class="input-group">
        
        <select name="floor" class="form-select" id="" v-model="floor">
            <option value="" disabled>Этаж</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select><span class="input-group-text">.</span>
        <input type="number" class="form-control" placeholder="Кабинет" name='cabName' v-model="cabName">

    </div>
        <div>
            <div class="mb-3 form-floating">
                <textarea id="textarea" placeholder="Описание" class="form-control" v-model="description"></textarea>
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Создать</button>
        </div>
    </form>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            floor:'',
            cabName:'',
            description: '',
            binder:''
        }
    },
    // {
//   "name": "string",
//   "user": {
//     "jobTitle": "string"
//   },
//   "audience": {
//     "technicalTask": "string"
//   }
    methods: {
        async createAudience() {
            await axios.post('http://89.110.53.87:5003/Equipment/Api/Binder', {
                name: this.floor+'.'+this.cabName,
                audience: {
                    technicalTask: this.description
                }
            },{
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.$cookies.get('accessUserToken')
                }
            })
            .then((response)=>{  
                return this.binder = response.data;
            });
        }
    }
}
</script>

<style>
form {
    margin: auto auto;
}
/* Works for Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Works for Firefox */
      input[type="number"] {
        -moz-appearance: textfield;
      }
</style>