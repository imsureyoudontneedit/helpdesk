<template>
    <div class="leftMenu">
        <div class="wrapper" v-show="this.$cookies.get('accessUserToken')">
            <div class="funcHeader">Функции</div>
            <ul class="list-group">
                <li class="list-group-item"><router-link to='/equipmentList'> Просмотр оборудования</router-link></li>
                <li class="list-group-item"><router-link to='/binderList'>Аудитории</router-link></li>
                <li class="list-group-item">Преподаватели</li>
                <li class="list-group-item">Акты</li>
                <li class="list-group-item"><router-link to='/createEquipment'>Прочее</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .leftMenu {
        background-color: #a1dafc;
        color: #424242;
        font-family: Montserrat-SemiBold;
        width: 28%;
        text-align: left;
        min-height: 950px;
        height: auto;
    }

    .wrapper {
        padding-top: 20%;
        padding-left: 5%;
    }

    .funcHeader {
        font-size: 4.5vw;
        margin-left: 2.5%;
    }

    .list-group {
        font-size: 2.7vw;
        
    }

    .list-group-item {
        border: none;
        background: transparent;
    }
    .router-link-active {
        text-decoration: none;
        color: #2e83b4;
    }
    a {
        text-decoration: none;
        color: #424242;
    }
</style>