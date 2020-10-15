<template>
    <router-link :to="'/get-products-process/' + id">
        <div class="product-card card card-box overflow-hidden">
            <div class="product-img"
                 :style="{ backgroundImage: `url(${backgroundUrl})` }"></div>



            <div class="product-info p-3">
                <div class="title mt-1 mb-2">{{ title }}</div>
                <div class="brand">Бренд: {{ brand }}</div>
                <div class="model">Модель: {{ model }}</div>
            </div>

        </div>
    </router-link>
</template>

<script>

    import backgroundUrl from "@/assets/img/alivero-img/no_image.png";

    export default {
        data() {
            return {
                backgroundUrl,
            };
        },

        props: {
            id: {
                type: Number,
                default: 1
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
        border-radius: 6px;

        &:active {
            box-shadow: none!important;
        }

    }


    .product-img {
        overflow: hidden;
        min-width: 160px;
        width: 160px;
        background-size: cover;
        height: auto;
        background-position: center;


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
