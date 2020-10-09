<template>
    <div class="p-4">
        <div class="d-flex mb-3 align-items-center">
            <div class="page-title flex-grow-1">
                {{ $store.getters['dataset/specificationById']($route.params.spec_id).name }}
            </div>
            <div class="page-search">
                <div class="form-group mb-0">
                    <div class="input-group input-group-lg input-group-seamless">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-search"></i></span>
                        </div>
                        <input class="form-control" placeholder="Поиск по странице" type="text">
                    </div>
                </div>

            </div>
        </div>

        <div class="card overflow-hidden shadow-none border-0">
            <div class="grid-wrapper">
                <div class="category-grid">
                    <category-card v-for="(item, index) in $store.getters['dataset/categories']($route.params.spec_id)" :key="index" :title="item.name" :id="item.id" />
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



</style>
