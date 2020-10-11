<template>
    <div class="p-4 d-flex flex-column">
        <div class="d-flex mb-3 align-items-center">
            <div class="btn-back mr-2 pointer " @click="$router.go(-1)">
                <i class="fa fa-arrow-left"></i>
            </div>
            <div class="page-title flex-grow-1">
                {{ $store.getters['dataset/categoryById']($route.params.category_id).name }}
            </div>
<!--            <div class="page-search">-->
<!--                <div class="form-group mb-0">-->
<!--                    <div class="input-group input-group-lg input-group-seamless">-->
<!--                        <div class="input-group-prepend">-->
<!--                            <span class="input-group-text"><i class="fas fa-search"></i></span>-->
<!--                        </div>-->
<!--                        <input class="form-control" placeholder="Поиск по странице" type="text">-->
<!--                    </div>-->
<!--                </div>-->

<!--            </div>-->
        </div>

        <div class="card overflow-hidden shadow-none border-0">
            <div class="grid-wrapper">
                <div class="product-grid">
                    <product-card v-for="(item, index) in $store.getters['dataset/products']($route.params.category_id)" :key="index" :id="item.id" :title="item.name" :brand="item.brand.name" :model="item.model"/>
                </div>

            </div>
        </div>



    </div>


</template>

<script>
    import ProductCard from './components/product_card/index'

    export default {
        components: {
            ProductCard
        }
    }
</script>

<style scoped lang="scss">
    .btn-back {
        color: #8989a8;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 6px;

        i {
            font-size: 32px;
            line-height: 52px;
        }

        &:active {
            color: #3c44b1;
        }
    }

    .page-search {
        width: 300px;
    }

    .grid-wrapper {
        overflow-y: auto;
        height: calc(100vh - 231px);
    }

</style>
