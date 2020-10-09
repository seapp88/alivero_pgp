<template>
    <router-link :to="'/get-products-process/' + id">
        <div class="product-card card card-box overflow-hidden">
            <div class="product-img"
                 style="background-image: url('https://img1.wbstatic.net/big/new/15000000/15009483-2.jpg')"></div>

            <div class="product-info p-3">
                <div class="title mt-1 mb-2">{{ title }}</div>
                <div class="brand">Бренд: {{ brand }}</div>
                <div class="model">Модель: {{ model }}</div>
            </div>

        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: '4436192e-51d6-4e42-8733-ab8c9e8fc863'
            },
            brand: {
                type: String
            },
            title: {
                type: String
            },
            model: {
                type: String
            }
        }
    }
</script>

<style scoped lang="scss">

    .product-card {
        display: flex;
        flex-direction: row;
        height: 100%;
        min-height: 180px;


    }


    .product-img {
        overflow: hidden;
        min-width: 160px;
        width: 160px;
        background-size: cover;
        height: auto;


    }

    .product-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        .title {
            flex: 1;
            font-size: 18px;
            line-height: 1.3;
            font-weight: 600;
            color: #070919;
            word-break: break-word;

        }

        .brand {
            font-size: 14px;
            font-weight: 600;
            color: #676785;
        }

        .model {
            font-size: 14px;
            font-weight: 600;
            color: #676785;
        }
    }
</style>
