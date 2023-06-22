<template>
    <div class="footer d-flex justify-content-evenly py-4">
        <div class="leftText">
            <div class="leftTextHeader">
                Наши контакты
            </div>
            <div class="leftTextMain">
                Адрес: г. Санкт-Петербург, набережная реки Смоленки, д. 1, лит. А
                Телефоны: (812) 405-85-30 (приемная комиссия), (812) 405-85-38 (учебная часть), (812) 405-85-59 (приемная директора)
            </div>
        </div>
        <div class="rightText">
            <div class="rightTextHeader">
                О сайте
            </div>
            <div class="rightTextMain">
                © 2023 СПб ГБ ПОУ «Радиотехнический колледж»
                Сайт разработан в соответствии с требованиями Постановления Правительства РФ № 1802 от 20.10.2021
                Требования к структуре официального сайта образовательной организации в ИТС «Интернет» и формату представления на нем информации утверждены Приказом Рособрнадзора № 831 от 14.08.2020
                <div>ГОСУДАРСТВЕННАЯ ИТОГОВАЯ АТТЕСТАЦИЯ</div>
                <div>Министерство просвещения Российской Федерации</div>
                <div>Министерство науки и высшего образования Российской Федерации</div>
                <div>Согласие на обработку персональных данных</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .footer {
        width: 100%;
        height: max-content;
        background-color: #1E1E1E;
        color: #FFFFFF;
        text-align: left;
    }

    .leftText {
        height: 320px;
        width: 36%;
    }

    .leftTextHeader {
        font-family: Montserrat-SemiBold;
        font-size: 20px;
    }

    .leftTextMain {
        font-family: Montserrat-Light;
        font-size: 20px;
    }

    .rightText {
        width: 36%;
    }

    .rightTextHeader {
        font-family: Montserrat-SemiBold;
        font-size: 20px;
    }

    .rightTextMain {
        font-family: Montserrat-Light;
        font-size: 20px;
    }
</style>