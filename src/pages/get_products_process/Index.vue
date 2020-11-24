<template>
    <div class="p-4 d-flex flex-column">
        <div class="step-title mb-3">{{ product ? product.title : 'Выберите артикул' }}</div>
        <div class="card overflow-hidden shadow-none border-0">
            <div class="card-chooser card">


                <!--Пустой экран-->
                <div class="empty-screen p-4 scroll-container" v-if="!product.articles.length">
                    <div class="empty-screen">
                        <div class="empty-screen-message mb-5">
                            <div class="img">
                                <img src="@/assets/img/alivero-img/accept_empty.svg" alt="">
                            </div>
                            <div class="title">
                                Для выбранной модели нет готовых артикулов
                            </div>
                            <div class="message">
                                Обратитесь к администратору
                            </div>
                        </div>
                    </div>
                </div>

                <div class="scroll-container p-4" v-else>
                    <div class="articles-grid">

                        <div v-for="i in product.articles" class="articles-item card card-body d-flex flex-row align-items-center" :class="{active: $store.state.selectedData.articles && i.id === $store.state.selectedData.articles.id}"
                             @click="selectArticle(i)">
                            <div class="article-img mr-4">
                                <img v-if="!i.photo" height="50" src="@/assets/img/alivero-img/no_image.png"
                                     alt="">
                                <img v-else height="50"
                                     :src="$http.defaults.baseURL.replace('api/v1/pgp', '') + i.photo"
                                     alt="">
                            </div>
                            <div class="article-info flex-grow-1">
                                <h3 class="text-black font-weight-bold mb-3">{{ i.vendor_code }}</h3>
                                <div class="divider bg-neutral-second mb-3"></div>

                                <div class="colors d-flex flex-wrap">
                                    {{ i.color }}

                                    <div v-for="sku in i.skus">
                                        {{ sku.size }}
                                    </div>

<!--                                    <div class="color-item d-flex align-items-center flex-nowrap mr-3" v-for="color in i.colors"><span-->
<!--                                            class="badge badge-circle mr-2" :style="`background-color: ${color.hex}`">{{ color.name }}</span><span-->
<!--                                            class="font-size-lg ">{{ $store.state.selectedData.articles.color }}</span></div>-->

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <!--                <div class="scroll-container p-4">

                                    <div class="color-container">
                                        <div class="palette-title">Палитры</div>
                                        <div class="palette-box d-flex position-relative mb-4 ">
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
                                        </div>
                                    </div>

                                    <div class="divider my-5"></div>

                                    <div class="sixes-container">
                                        <div class="palette-title">Размеры</div>

                                        <div class="sizes-grid">

                                            <div class="size-item" v-for="i in 10">
                                                <div class="size-category">Женская одежда</div>
                                                <div class="size">42 (RUS44)</div>
                                            </div>

                                        </div>
                                    </div>

                                </div>-->
            </div>

        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                isColor: false,
                isSize: false,
                category: null,
                product: null
            }
        },
        created() {
            this.product = this.$store.getters['dataset/product'](this.$route.params.product_id);
            let category = this.$store.getters['dataset/categoryById'](this.product.category_id);
            this.isColor = !!category.is_select_color;
            this.isSize = !!category.is_select_size;
            this.category = category
        },
        methods: {
            selectArticle(i) {
                this.$store.dispatch('selectedData/setArticles', i);
                this.product = this.$store.getters['dataset/product'](this.$route.params.product_id);
                let category = this.$store.getters['dataset/categoryById'](this.product.category_id);
                let isSize = !!category.is_select_size;
                if(isSize){
                    this.$store.dispatch('selectedData/setSizeCategory', this.product.category_size_id);
                    this.$router.push('/get-products-process/' + this.$route.params.product_id + '/size')
                }
            },
        }
    }
</script>

<style scoped lang="scss">

    .articles-grid {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 20px;
        grid-auto-rows: 1fr;
    }

    .articles-item {
        box-shadow: none;
        border: 2px solid #d1d2db;


        &:hover {
            box-shadow: 0 0.46875rem 1.1875rem rgba(0, 0, 0, 0.03), 0 0.9375rem 1.40625rem rgba(0, 0, 0, 0.03), 0 0.25rem 0.53125rem rgba(0, 0, 0, 0.05), 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.03);
        }

        &.active {
            border: 2px solid #3c44b1;
            box-shadow: 0 0.46875rem 0.1875rem rgba(60, 68, 177, 0.1), 0 0.9375rem 1.40625rem rgba(60, 68, 177, 0.1);

        }
    }

    .article-img {
        border-radius: 4px;
        overflow: hidden;
        min-width: 90px;


        img {
            width: 90px;
            min-width: 90px;
            height: 110px;
            object-fit: cover;
        }
    }

    .badge-circle {
        height: 16px;
        width: 16px;
    }

    .empty-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 450px);

        .actions {
            .btn {
                height: 72px;

                [class^="flaticon-"]:before, [class*=" flaticon-"]:before,
                [class^="flaticon-"]:after, [class*=" flaticon-"]:after {
                    line-height: 1;
                    font-size: 20px;
                }
            }
        }

        .empty-screen-message {
            border-radius: 6px;
            text-align: center;

            .img {
                height: 300px;
                margin-bottom: 20px;

                img {
                    height: 100%;
                }

            }

            .title {
                font-weight: 600;
                font-size: 20px;
                margin-bottom: 5px;
            }

            .message {
                font-size: 18px;
            }
        }
    }


    .steps {

        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 30px;

        .btn-step {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-radius: 6px;
            border: 2px solid #3c44b1;
            color: #3c44b1;
            font-weight: bold;
            font-size: 18px;
            height: 80px;
            flex: 1;

            &.active {
                background-color: #3c44b1;
                color: white;

            }

            &:active {
                background-color: rgba(60, 68, 177, 0.21);

            }
        }
    }

    .card-chooser {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
    }

    .scroll-container {
        width: 20px;
        flex: 1;
        overflow-y: auto;
        height: calc(100vh - 215px);
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

    .palette-box {
        padding: 0 40px;
    }

    .palette-grid::-webkit-scrollbar {
        display: none;
    }

    .palette-nav-btn {
        padding: 0 24px 0 20px;
        display: flex;
        height: 100%;
        width: 40px;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        background-color: #3c44b1;
        position: absolute;
        z-index: 2;
        top: 0;

        &.left {
            left: 0;
            padding: 0 16px 0 12px;
            border-radius: 0.65em 0 0 0.65em;


        }

        &.right {
            right: 0;
            padding: 0 12px 0 16px;
            border-radius: 0 0.65em 0.65em 0;


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

    .palette-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .sizes-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 1fr;
        gap: 15px;


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

            .size-category {
                font-size: 16px;
                font-weight: 400;
                color: #363e85;
                margin-bottom: 5px;
            }


            &:active {
                background-color: rgba(60, 68, 177, 0.11);
            }

            &.active {
                background-color: #3c44b1;
                color: #ffffff;
                border: 2px solid #3c44b1;

            }
        }


    }

</style>
