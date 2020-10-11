<template>
    <div>
        <div class="p-3 d-flex flex-column">
            <div class="search-card card p-4 bg-primary text-white">
                <div class="page-title mb-1 text-white">Поиск товара по названию или модели</div>
                <div class="search-hint mb-3">Введите в поле название или модель товара, который необходимо принять</div>
                <div class="form-group mb-0">
                    <div class="input-group input-group-lg input-group-seamless">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-search text-primary opacity-9"></i></span>
                        </div>
                        <input class="form-control search-card-input"
                               @focus="showSearch = true"
                               :value="searchText"
                               placeholder="Например, Рубашка женская Mango"
                               type="text">
                    </div>
                </div>
            </div>

            <!--Список последних товаров-->
            <div class="recent-list px-3" v-if="!showSearch && searchText === ''">
                <div class="page-title mb-3 ">Последние принятые товары</div>
                <!--Пустой экран-->
                <div class="empty-screen" v-if="!$store.state.dataset.recentProducts.length">
                    <div class="empty-screen-message">
                        <div class="img">
                            <img src="@/assets/img/alivero-img/undraw_empty_xct9 (1).svg" alt="">
                        </div>
                        <div class="title">
                            Список принятых товаров пуст

                        </div>
                        <div class="message">
                            Чтобы принять товар, воспользуйтесь поиском<br>или найдите товар по каталогу с помощью меню
                            слева.

                        </div>
                    </div>
                </div>
                <!--Список товаров-->
                <div class="product-grid" v-else>
                    <product-card v-for="i in $store.state.dataset.recentProducts"></product-card>
                </div>
            </div>


            <!--Результаты поиска-->

            <div class="search-result px-3" v-else>
                <div class="result-title mb-3 pb-3">
                    <div class="div">
                        <div class="page-title">
                            Результаты поиска
                        </div>
                        <div class="search-hint">По вашему запросу найдено товаров: {{ $store.state.dataset.recentProducts.length }}</div>

                    </div>


                    <div class="btn-clear-search" @click="searchText = ''">
                        <i class="fa fa-undo-alt pr-1"></i>

                        Очистить поиск
                    </div>
                </div>
                <!--Пустой экран-->
                <div class="empty-screen" v-if="!$store.state.dataset.recentProducts.length">
                    <div class="empty-screen-message">
                        <div class="img">
                            <img src="@/assets/img/alivero-img/undraw_web_search_eetr.svg" alt="">
                        </div>
                        <div class="title">
                            По вашему запросу ничего не найдено

                        </div>
                        <div class="message">
                            Попробуйте ввести другой запрос</br>или найдите товар по каталогу с помощью меню слева.

                        </div>
                    </div>
                </div>
                <!--Список товаров-->
                <div class="product-grid" v-else>
                    <product-card v-for="i in $store.state.dataset.recentProducts"
                                  :brand="i.brand.name"
                                  :title="i.name"
                                  :model="i.model"
                                  :id="i.id"/>
                </div>
            </div>


        </div>

        <keyboard v-if="showSearch" @hide="showSearch = false" v-model="searchText"></keyboard>


    </div>
</template>

<script>
    import ProductCard from './components/product_card/index'

    export default {
        components: {
            ProductCard
        },
        data() {
            return {
                showSearch: false,
                searchText: ''
            }
        },
        watch: {
            searchText(val){
                if(val !== ''){
                    this.searchDocuments();
                }else{
                    // this.$store.dispatch('product/setSearchList', [])
                }
            }
        },
        methods: {
            async searchDocuments(){
                try{
                    let { data } = await this.$http.get('/product/search?search=' + this.searchText);
                    // this.$store.dispatch('product/setSearchList', data)
                }catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .search-hint {
        font-size: 16px;
    }

    .search-card {
        margin-bottom: 26px;
        .search-card-input {
            font-size: 20px;
            font-weight: 600;

        }

        .search-card-input::placeholder {
            font-size: 20px;
            font-weight: 400;

        }
    }

    .recent-list {
        .page-title {
            border-bottom: 2px solid #3c44b1;
            padding-bottom: 4px;
        }
    }

    .search-result {
        .result-title {
            display: flex;
            border-bottom: 2px solid #3c44b1;
            align-items: center;
            justify-content: space-between;

            .search-hint {
                font-weight: bold;
                font-size: 20px;
                line-height: 1.3;
            }

            .page-title {
                flex: 1;
            }

            .btn-clear-search {
                padding: 15px 24px;
                background-color: rgba(48, 54, 89, 0.51);
                border-radius: 100px;
                color: white;
            }
        }
    }

    .empty-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 450px);

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

    .search-result .empty-screen {
        height: calc(100vh - 488px);

    }


</style>
