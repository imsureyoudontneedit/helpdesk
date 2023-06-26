<template>
  <div class="wrapper mt-4 ms-5">
    <h2>Аудитории</h2>
    <div class="floor-row border-bottom " v-for="(auditList,id) in sortedAuditList" :key='id'>
        <h3 class="floor-title">{{ id+1 }} этаж</h3>
        <div class="audits-container d-flex flex-wrap">
            <router-link :to="`/equipmentBinder/${auditItem[2]}`" class="btn ms-4 mb-3" v-for="auditItem in auditList" :key="`${auditItem[0]}.${auditItem[1]}`">
                {{ `${auditItem[0]}.${auditItem[1]}` }}
            </router-link>
        </div>
        
    </div>
    <router-link to="/createAudience" class="btn mt-3">Добавить аудиторию</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
     
    data() {
      return {
          binderList: {},
          audit: [],

          sortedAuditList: [],
      }
    },
    methods: {
        async getBinderList() {
            await axios.get('http://77.232.44.8:49120/Equipment/Api/Binder?skip=0&take=100000',
            {headers: {
                'Authorization': "Bearer " + this.$cookies.get('accessUserToken')
            }
            })
            .then((response) => {
              
                 this.binderList = response.data
                 return this.getAudit()
            })
        },
        getAudit(){
          this.binderList.forEach(item => {
            if(item.user == null)
                this.audit.push(`${item.name}.${item.id}`)

          });

          
          this.getSortedAudit();
        },
        getSortedAudit(){
            this.audit.sort()
            let arr=[]
            this.audit.forEach(item => {

                item=item.split('.')
                if( item.length >2){
                    arr.push(item)
                }
            });

            let sortedAudit=[];
            for (let i=1; i<=arr[arr.length-1][0]; i++) {
                let auditGroup=[];

                for(let j=0; j<=arr.length;j++){
                    if (arr[j] == undefined){
                        break;
                    }
                    if(arr[j][0] !=i){
                        continue
                    }
                    if (arr[j][0]==i){
                        auditGroup.push(arr[j]);
                    }
    
                }
                sortedAudit.push(auditGroup)
                
            }
            return this.sortedAuditList = sortedAudit
        }
    },
    mounted() {
        this.getBinderList();
    }
}

</script>

<style scoped>
    .wrapper {
        width: 100%;
    }
    .btn {
         background-color: #6fbfee;
        border-color: none;
        width: max-content;
        border-radius: 25px;
        color: white
    }
</style>