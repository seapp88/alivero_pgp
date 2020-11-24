<template>
    <div class="menu-wrapper">
        <div class="menu-steps">
            <menu-item title="Артикулы" icon="fa fa-tags" :to="'/get-products-process/' + $route.params.product_id + '/'"/>
            <menu-item title="Выбрать размер" icon="flaticon-measuring-tape" :to="'/get-products-process/' + $route.params.product_id + '/size'" v-if="!!$store.state.selectedData.articles.id"/>
<!--            <menu-item title="Добавить теги" icon="flaticon-hastag" :to="'/get-products-process/' + $route.params.product_id + '/tag'"/>-->
        </div>

        <div class="menu-exit">
            <menu-item title="Назад к выбору товара" icon="flaticon-previous" :to="category ? `/get-products/${category.template_id}/${category.id}` : '/get-products'" />
        </div>

    </div>
</template>

<script>
    import MenuItem from './MenuItem'

    export default {
        components: {
            MenuItem
        },
        data(){
            return {
                isColor: false,
                isSize: false,
                category: null,
                product: null
            }
        },
        created(){
            let product = this.$store.getters['dataset/product'](this.$route.params.product_id);
        },
        methods: {

        }
    }
</script>

<style scoped>
    .menu-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #303659;
        width: 180px;
        min-width: 180px;
        max-width: 180px;
        overflow-y: hidden;
        align-items: center;
        padding: 10px;
    }

    .menu-steps {
        flex: 1;
    }

</style>
