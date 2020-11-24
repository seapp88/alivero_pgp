<template>
    <div class="p-4">
        <div class="d-flex align-items-center justify-content-between  mb-3">
            <div class="step-title flex-grow-1 mb-0">Вы можете выбрать только 1 размер</div>
            <div class="hint">Выбрано: {{ !$store.state.selectedData.size ?
                'Размер не выбран!' :
                $store.getters['dataset/sizeById']($store.state.selectedData.size).text
                }}
            </div>

        </div>
        <div class="card-chooser card">
<!--            <div class="size-category">-->
<!--                <div class="size-nav-btn">-->
<!--                    <i class="fa fa-angle-up"></i>-->
<!--                </div>-->
<!--                <div class="size-category-list">-->
<!--                    <div class="size-category-item"-->
<!--                         v-for="category in $store.state.dataset.categorySize"-->
<!--                         :class="{active: category.id === $store.state.selectedData.sizeCategory}"-->
<!--                         @click="$store.dispatch('selectedData/setSizeCategory', category.id)">-->
<!--                        {{ category.name }}-->
<!--                    </div>-->
<!--                </div>-->

<!--                <div class="size-nav-btn">-->
<!--                    <i class="fa fa-angle-down"></i>-->
<!--                </div>-->
<!--            </div>-->

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

            <div class="empty-screen" v-else>
                <div class="empty-screen-message">
                    <div class="img">
                        <img src="@/assets/img/alivero-img/accept_empty.svg" alt="">
                    </div>
                    <div class="title">
                        Выберите артикул товара

                    </div>
                    <div class="message">
                        Чтобы принять товар, необходимо выбрать артикул товара и его размер.

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

    .empty-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        /*height: calc(100vh - 450px);*/

        .empty-screen-message {
            border-radius: 6px;
            text-align: center;

            .img {
                height: 360px;
                margin-bottom: 30px;

                img {
                    height: 100%;
                }

            }

            .title {
                font-weight: 600;
                font-size: 26px;
                margin-bottom: 5px;
            }

            .message {
                font-size: 18px;
                width: 600px;
            }
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
