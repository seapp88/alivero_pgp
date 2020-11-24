<template>
    <div class="p-4 d-flex flex-column">
        <div class="d-flex mb-3 align-items-center">
            <div class="w-25">
                <div class="btn-header btn-settings mr-3 pointer" @click="$router.push('/get-products/' + $route.params.company_id)">
                    <i class="fa fa-arrow-left"></i>
                    Назад
                </div>
            </div>
            <div class="page-title flex-grow-1 text-center">
                Выберите категорию
            </div>
            <div class="page-search w-25">
<!--                <div class="form-group mb-0">-->
<!--                    <div class="input-group input-group-lg input-group-seamless">-->
<!--                        <div class="input-group-prepend">-->
<!--                            <span class="input-group-text"><i class="fas fa-search"></i></span>-->
<!--                        </div>-->
<!--                        <input class="form-control" placeholder="Поиск по странице" type="text">-->
<!--                    </div>-->
<!--                </div>-->

            </div>
        </div>

        <div class="card overflow-hidden">
            <div class="grid-wrapper">
                <div class="category-grid">
                    <category-card v-for="(item, index) in $store.getters['dataset/categories']($route.params.company_id)" :key="index" :title="item" />
                </div>
            </div>
        </div>



    </div>

</template>

<script>
    import CategoryCard from './components/category_card/index'

    export default {
        components: {
            CategoryCard
        }
    }
</script>

<style scoped lang="scss">
    .category-grid {
        display: grid;
        grid-template-columns: repeat(6,1fr);
        grid-auto-rows: 1fr;
        grid-gap: 15px;
        padding: 20px;
    }

    .page-search {
    }

    .grid-wrapper {
        overflow-y: auto;
        height: calc(100vh - 231px);
    }

    .btn-header {
        display: flex;
        align-items: center;
        border-radius: 6px;
        font-weight: 600;
        line-height: 48px;
        height: 48px;
        padding: 0 24px;
        width: fit-content;

        &.btn-settings {
            color: rgba(53, 55, 90, 0.8);
            border: 2px solid rgba(53, 55, 90, 0.51);

            i {
                font-size: 18px;
                padding-right: 10px;
            }
        }

    }



</style>
