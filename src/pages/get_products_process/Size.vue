<template>
    <div class="p-4">
        <div class="d-flex align-items-center justify-content-between  mb-3">
            <div class="step-title flex-grow-1 mb-0">Вы можете выбрать только 1 размер</div>
            <div class="hint">Выбрано: Женская одежда 42 (RUS44)</div>

        </div>
        <div class="card-chooser card">
            <div class="size-category">
                <div class="size-nav-btn">
                    <i class="fa fa-angle-up"></i>
                </div>
                <div class="size-category-list">
<!--                    <div class="size-category-item active">-->
<!--                        Женская одежда-->
<!--                    </div>-->
                    <div class="size-category-item"
                         v-for="category in $store.state.dataset.categorySize"
                         :class="{active: category.id === $store.state.selectedData.sizeCategory}"
                         @click="$store.dispatch('selectedData/setSizeCategory', category.id)">
                        {{ category.name }}
                    </div>
                </div>

                <div class="size-nav-btn">
                    <i class="fa fa-angle-down"></i>
                </div>
            </div>

            <div class="size-grid-container p-4" v-if="$store.state.selectedData.sizeCategory">
                <div class="size-grid">
                    <div class="size-item"
                         v-for="size in $store.getters['dataset/sizes']($store.state.selectedData.sizeCategory)"
                         :class="{active: size.id === $store.state.selectedData.size}"
                         @click="$store.dispatch('selectedData/setSize', size.id)">
                        {{ size.name }} (RU {{ size.ru }})
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
    .card-chooser {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        height: calc(100vh - 215px);
    }

    .size-category {
        display: flex;
        flex-direction: column;
        width: 350px;
        min-width: 350px;
        background-color: #3c44b1;

    }

    .size-category-list {
        overflow-y: auto;
        padding: 4px 16px;
        height: calc(100vh - 358px);
    }

    .size-category-list::-webkit-scrollbar {
        display: none;
    }

    .size-category-item {
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 18px;
        font-weight: 600;
        padding: 24px 16px;
        border-radius: 10px;
        margin: 5px 0;
        text-align: center;
        &.active {
        background-color: white;
        color: #3c44b1;
         }

    }

    .size-grid-container {
        flex: 1;
        overflow-y: auto;
        height: calc(100vh - 215px);


    }

    .size-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 15px;
    }

    .size-item {
        background-color: #ffffff;
        width: 100%;
        border: 2px solid #b4b4d3;
        font-size: 18px;
        font-weight: 600;
        padding: 34px 20px;
        text-align: center;
        border-radius: 4px;
        background-color: rgba(60, 68, 177, 0.06);
        color: #3c44b1;


        &:active {
            background-color: rgba(60, 68, 177, 0.11);
        }
        &.active {
            background-color: #3c44b1;
            color: #ffffff;
            border: 2px solid #3c44b1;

        }



    }

    .size-nav-btn {
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        background-color: #3c44b1;
        border-radius: 8px;

    &:active {
         background-color: #3c449f;
         color: #ffffff;
     }


    i {
        font-size: 34px;
        line-height: 1;
    }
    }

</style>
