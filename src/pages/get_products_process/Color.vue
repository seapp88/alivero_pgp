<template>

    <div class="p-4 d-flex flex-column">

        <div class="step-title mb-3">Вы можете выбрать до 6 цветов для этого товара</div>
        <div class="colors-switch d-flex">
            <div class="switch-button" :class="{active: !isAllColorTab}" @click="isAllColorTab = false">
                Часто используемые
            </div>
            <div class="switch-button" :class="{active: isAllColorTab}" @click="isAllColorTab = true">
                Все цвета
            </div>
        </div>
        <div class="card-chooser card">
            <div v-if="isAllColorTab" class="scroll-container p-4">
                <div class="color-grid">
                    <div class="color-item" v-for="color in $store.state.dataset.colors"
                         :class="{active: $store.getters['selectedData/isColorActive'](color.id)}"
                         @click="$store.dispatch('selectedData/setColor', color.id)">
                        <div class="color-prew" :style="'background-color: ' + color.hex"></div>
                        <div class="color-title px-2 flex-grow-1">{{ color.name }}</div>
                        <div class="color-check px-3">
                            <i class="fa fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="scroll-container p-4">
                <!--                <div class="color-palette-title">Готовые палитры для этой модели</div>

                                <div class="d-flex position-relative px-4 mb-4">
                                    <div class="palette-nav-btn left">
                                        <i class="fa fa-angle-left"></i>
                                    </div>

                                    <div class="palette-grid">
                                        <div class="p-2 d-flex">
                                            <div class="palette-card card px-3 py-2 active">
                                                <div class="color-item" v-for="i in 5">
                                                    <div class="color-marker" style="background-color: #ffffff"></div>
                                                    <div class="color-title">перламутровый ночной сини</div>
                                                </div>

                                            </div>
                                            <div class="palette-card card px-4 py-2" v-for="i in 6">
                                                <div class="color-item" v-for="i in 4">
                                                    <div class="color-marker" style="background-color: #8c0615"></div>
                                                    <div class="color-title">перламутровый ночной сини</div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                    <div class="palette-nav-btn right">
                                        <i class="fa fa-angle-right"></i>
                                    </div>
                                </div>-->

<!--
                <div class="color-palette-title">Часто используемые цвета</div>
-->

                <div class="color-grid">

                    <div class="color-item" v-for="color in $store.state.dataset.colors"
                         :class="{active: $store.getters['selectedData/isColorActive'](color.id)}"
                         @click="$store.dispatch('selectedData/setColor', color.id)">
                        <div class="color-prew" :style="'background-color: ' + color.hex"></div>
                        <div class="color-title px-2 flex-grow-1">{{ color.name }}</div>
                        <div class="color-check px-3">
                            <i class="fa fa-check"></i>
                        </div>
                    </div>

                </div>


            </div>
        </div>




    </div>


</template>

<script>
    export default {
        data() {
            return {
                isAllColorTab: false
            }
        }
    }
</script>

<style scoped lang="scss">




    .card-chooser {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        border-top-left-radius: 0 !important;
    }

    .scroll-container {
        width: 20px;
        flex: 1;
        overflow-y: auto;
        max-height: calc(100vh - 270px);
    }


    .switch-button {
        color: rgba(60, 68, 167, 0.78);
        background-color: rgba(255, 255, 255, 0.6);
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        padding: 12px 30px;
        font-size: 18px;
        border-top: 4px solid transparent;

        &.active {
            z-index: 3;
            background-color: #FFFFFF;
            color: #3c44b1;
            font-weight: bold;
            border-top-color: #3c44b1;

        }
    }

    .palette-grid {
        background-color: #e7e9f5;
        border-radius: 8px;
        border: 2px solid #e7e9f5;
        min-width: 100%;
        display: flex;
        overflow-x: auto;

    }

    .palette-card {
        margin: 5px;
        border: 2px solid #eceef7;
        min-width: 320px;
        max-width: 320px;


        &:active {
            border: 2px solid #3c44b1;
        }

        &.active {
            border: 2px solid #3c44b1;
        }

        .color-item {
            display: flex;
            align-items: center;
            padding: 5px 0;
        }

        .color-marker {
            width: 20px;
            min-width: 20px;
            height: 20px;
            min-height: 20px;
            border-radius: 12px;
            margin-right: 8px;
            border: 1px solid #eceef7;

        }

        .color-title {
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:first-letter {
                text-transform: uppercase;
            }
        }
    }

    .palette-grid::-webkit-scrollbar {
        display: none;
    }

    .palette-nav-btn {
        padding: 0 24px 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        background-color: #3c44b1;
        border-radius: 50px;
        position: absolute;
        z-index: 2;
        top: calc(50% - 21px);

        &.left {
            left: 0;
            padding: 0 16px 0 12px;

        }

        &.right {
            right: 0;
            padding: 0 12px 0 16px;

        }

        &:active {
            background-color: #3c449f;
            color: #ffffff;
        }


        i {
            font-size: 28px;
            line-height: 42px;

        }
    }

    .color-palette-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .color-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
        gap: 15px;


        .color-item {
            overflow: hidden;
            display: flex;
            flex-direction: row;
            align-items: center;
            border: 2px solid #eceef7;
            border-radius: 6px;
            height: 60px;
            min-height: 60px;
            background-color: white;

            &:active {
                border: 2px solid #3c44b1;

            }


            .color-prew {
                height: 60px;
                min-height: 60px;
                width: 60px;
                border-bottom: 1px solid #eceef7;

            }

            .color-title {

            }

            .color-check {
                display: none;
            }

            &.active {
                border: 2px solid #3c44b1;

                .color-check {
                    display: block;
                }
            }
        }


    }


</style>
