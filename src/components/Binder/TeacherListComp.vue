<template>
  <div class="wrapper">
    {{ teacher }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
     
    data() {
      return {
          binderList: {},
          teacher: [],
      }
    },
    methods: {
        async getBinderList() {
            await axios.get('http://banaworld.ru:5003/Equipment/Api/Binder',
            {headers: {
                'Authorization': "Bearer " + this.$cookies.get('accessUserToken')
            }
            })
            .then((response) => {
              
                 this.binderList = response.data
                 return this.getteacher()
            })
        },
        getteacher(){
          this.binderList.forEach(item => {
            if(item.user != null)
                this.teacher.push(item.name)
          });
          this.teacher.sort()
        }
    },
    mounted() {
        this.getBinderList();
    }
}
</script>

<style scoped>

</style>