<template>

    <div class="menu-wrapper">
        <div class="menu-steps">
            <menu-item title="Цвета" icon="flaticon-paint-brush" :to="'/get-products-process/' + $route.params.product_id + '/color'" />
            <menu-item title="Размер" icon="flaticon-measuring-tape" :to="'/get-products-process/' + $route.params.product_id + '/size'"/>
            <menu-item title="Теги" icon="flaticon-hastag" :to="'/get-products-process/' + $route.params.product_id + '/tag'"/>
        </div>

        <div class="menu-exit">
            <menu-item title="Назад к выбору товара" icon="flaticon-previous" to="/get-products"/>
        </div>

    </div>
    <!--<div>


        <menu-item v-for="(item, index) in items" :key="index" :title="item" icon="" :to="'/get-products-process/' + $route.params.product_id + '/' + item" />



    </div>-->
</template>

<script>
    import MenuItem from './MenuItem'

    export default {
        components: {
            MenuItem
        },
        data(){
            return {
                items: ['color', 'size', 'tag']
            }
        },
        created(){

        },
        methods: {

        }
    }
</script>

<style scoped>
    .menu-wrapper {
        background-color: #303659;
        width: 180px;
        min-width: 180px;
        max-width: 180px;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        height: calc(100vh - 124px);
    }

</style>
