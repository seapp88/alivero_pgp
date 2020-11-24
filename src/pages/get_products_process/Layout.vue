<template>
    <div class="page-container">
<!--        <menu-bar></menu-bar>-->

        <div class="content-wrapper">
            <router-view :key="$route.fullPath"></router-view>
        </div>

        <div class="process-product pl-3">
            <div class="process-product-card" v-if="product">

                <div class="product-card-header d-flex align-items-center justify-content-between pl-3 pr-2 py-2">
                    <div class="product-brand flex-grow-1">{{ product.title }}</div>
                    <div class="product-model">{{ product.brand }}</div>
                </div>

                <div class="product-card-body p-3">
                    <div class="product-img mt-3">
                        <img v-if="!product.photo && !$store.state.selectedData.articles" src="@/assets/img/alivero-img/no_image.png" alt="">
                        <img v-if="product.photo && !$store.state.selectedData.articles" :src="$http.defaults.baseURL.replace('api/v1/pgp', '') + product.photo" alt="">
                        <img v-if="product.photo && $store.state.selectedData.articles" :src="$http.defaults.baseURL.replace('api/v1/pgp', '') + $store.state.selectedData.articles.photo" alt="">
                    </div>
                    <div class="product-title mb-4">{{ $store.state.selectedData.articles ? $store.state.selectedData.articles.vendor_code : 'Артикул не выбран' }}</div>
<!--                    <div class="product-color">-->
<!--                        <div v-if="!$store.state.selectedData.articles">-->
<!--                            <div class="product-size mb-0 bg-danger">Артикул не выбран!</div>-->
<!--                        </div>-->
<!--                        <div v-else>-->
<!--                            <div class="product-size mb-0">{{ $store.state.selectedData.articles.vendor_code }}</div>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="product-size"
                         v-if="isSize"
                         :class="{'bg-danger': !$store.state.selectedData.size}">
                        {{ !$store.state.selectedData.size ?
                        'Размер не выбран!' :
                        $store.getters['dataset/sizeById']($store.state.selectedData.size).text
                        }}
                    </div>
<!--                    <div class="product-tags d-flex align-items-center justify-content-center" v-if="!$store.state.selectedData.tags.length">-->
<!--                        <div class="tag tag-none flex-grow-1 bg-neutral-second text-dark">Теги не выбраны</div>-->
<!--                    </div>-->
<!--                    <div class="product-tags d-flex align-items-center justify-content-center" v-else>-->
<!--                        <div class="tag flex-grow-1">{{ $store.getters['dataset/tagById']($store.state.selectedData.tags[0]).name }}</div>-->
<!--                        <div class="tag-count" v-if="$store.state.selectedData.tags.length > 1">+{{ $store.state.selectedData.tags.length - 1 }}</div>-->
<!--                    </div>-->
                </div>

                <div class="product-card-count py-3 px-4">
                    <div class="input-count">
                        <input v-model="count" class="form-control m-0">
                    </div>
                    <num-pad v-model="count"></num-pad>


                </div>
                <div class="product-card-footer" @click="acceptProduct">
                    <div class="label">Принять товар</div>
                    <i class="fa fa-arrow-right pl-3"></i>
                </div>

            </div>

        </div>
    </div>


</template>

<script>
    import MenuBar from './components/menu_bar/index'

    // const printer = require("@thiagoelg/node-printer");
    const printer = require("printer");

    const zpl = require('../../../utils/zpl');

    export default {
        components: {
            MenuBar
        },
        data() {
            return {
                count: 1,
                product: null,
                isColor: false,
                isSize: false
            }
        },
        created(){
            this.$store.dispatch('selectedData/clearState');
            this.product = this.$store.getters['dataset/product'](this.$route.params.product_id);

            // let category = this.$store.getters['dataset/categoryById'](this.product.category_id);
            // console.log(category)
            // this.isSize = !!category.is_select_size;
            // this.category = category
        },
        methods: {
            async acceptProduct(){
                let data = {
                    article_id: +this.$store.state.selectedData.articles.id,
                    size_id: this.isSize ? this.$store.state.selectedData.size : null,
                    count: +this.count,
                    stock_rack_cell_id: this.$store.state.dataset.stock_rack_cell_id
                };

                let valid = false;

                if(this.isSize && !data.size_id){
                    alert('Выберите размер')
                    valid = false
                }else {
                    valid = true
                }

                if(data.count <= 0){
                    alert('Введите количество')
                    valid = false
                }

                if(!this.$store.state.dataset.stock_rack_cell_id){
                    alert('Перейдите в настройики и выберите место хранения');
                    valid = false
                }

                if(!this.$store.state.dataset.printer){
                    alert('Перейдите в настройики и выберите принтер')
                    valid = false
                }

                if(valid){
                    try{
                        let res = await this.$http.post('/accept', data);

                        res.data.forEach(barcode => {
                            let tmpMain = zpl.tmpMain({
                                name: this.product.name,
                                brand: this.product.brand.name,
                                model: this.product.model,
                                color: this.$store.state.selectedData.articles.colors[0] ? this.$store.state.selectedData.articles.colors[0].name : 'Отсутствует',
                                size: this.isSize ? this.$store.getters['dataset/sizeById'](this.$store.state.selectedData.size).text : 'Отсутствует',
                                id: barcode
                            });

                            printer.printDirect({
                                data: tmpMain,
                                printer: this.$store.state.dataset.printer,
                                type: "RAW",
                                success:function(){
                                    console.log("printed:");
                                }, error:function(err){console.log(err);}
                            });
                        });
                        this.$store.dispatch('dataset/addRecentProduct', this.product.id);
                        this.$router.push('/get-products')
                    }catch (e) {
                        console.log(e)
                        alert('Не удалось принять товар проверьте подключение к интернету')
                    }
                }




            }
        }
    }
</script>

<style scoped lang="scss">
    .page-container {
        background-color: #070919;

    }

    .content-wrapper {
        flex: 1;
        background-color: #e7e9f5;
        border-top-right-radius: 0.65em;
        border-bottom-right-radius: 0.65em;

    }

    .process-product {
        flex: 1;
        width: 464px;
        min-width: 464px;
        max-width: 464px;
        background-color: #070919;
        justify-content: space-between;
    }

    .process-product-card {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        border-radius: 0.65em;
        overflow: hidden;
        min-height: 100%;
    }

    .product-card-header {
        background-color: #eceef7;

        .product-brand {
            font-size: 16px;
            font-weight: bold;
            line-height: 30px;
            color: #303659;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 16px;
        }

        .product-model {
            font-size: 14px;
            font-weight: bold;
            line-height: 30px;
            color: #676785;
            background-color: #d3d6e5;
            padding: 0 12px;
            border-radius: 15px;
            white-space: nowrap;
        }

    }

    .product-card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        .product-img {
            background: #ccc;
            overflow: hidden;
            max-width: 200px;
            width: 200px;
            min-width: 200px;
            height: 240px;
            min-height: 240px;
            max-height: 240px;
            border-radius: 12px;
            margin-bottom: 36px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .product-title {
            font-size: 24px;
            font-weight: bold;
            line-height: 30px;
            text-align: center;
            color: #000000;
            word-break: break-word;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 60px;
            margin-bottom: 8px;
        }

        .product-color {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;

            .color-marker {
                width: 28px;
                min-width: 28px;
                height: 28px;
                min-height: 28px;
                border: solid 1px #edeef7;
                border-radius: 14px;
                margin: 6px 4px;
            }
        }

        .product-size {
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
            line-height: 24px;
            color: #ffffff;
            background-color: #3c44b1;
            padding: 8px 16px;
            border-radius: 4px;
            margin-bottom: 16px;
        }

        .product-tags {
            max-width: 100%;
            color: #3c44b1;
            font-size: 16px;
            line-height: 34px;

            .tag {
                padding: 0 16px;
                border-radius: 4px;
                border: solid 1px #3c44b1;
                background-color: rgba(127, 135, 238, 0.1);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 8px;
                &.tag-none {
                    border-color: transparent;
                }
            }

            .tag-count {
                padding: 0 16px;
                border-radius: 4px;
                border: solid 1px #3c44b1;
                background-color: #ffffff;
                font-weight: bold;
            }
        }

    }


    .product-card-count {
        background-color: #eceef7;

        .input-count {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;

            input {
                font-size: 22px;
                font-weight: 600;
                text-align: center;
                height: 64px;
                margin: 0 8px;

                &::placeholder {
                    font-size: 22px;
                    font-weight: 400;
                }
            }

            .input-count-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 64px;
                background-color: #3c44b1;
                border-radius: 4px;
                color: #ffffff;
                cursor: pointer;

                &:disabled {
                    opacity: 0.3;
                }

                &:active {
                    background-color: #363e85;
                }

                i {
                    font-size: 20px;
                    line-height: 64px;
                    padding: 0 30px;
                }
            }
        }
    }

    .product-card-footer {
        background-color: #21db76;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        cursor: pointer;
        flex-grow: 1;
        max-height: 90px;
        min-height: 70px;


        .label {
            margin-top: 5px;
            text-transform: uppercase;
            font-size: 26px;
            line-height: 30px;
            letter-spacing: 0.2px;
            font-weight: 600;
        }

        i {
            font-size: 26px;
            line-height: 30px;
        }

        &:active {
            background-color: #20a85b;
        }

    }


</style>
