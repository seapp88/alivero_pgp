<template>
    <router-link :to="'/get-products-process/' + id">
        <div class="product-card card card-box overflow-hidden">
            <div class="product-img"
                 :style="{ backgroundImage: `url(${photo ? $http.defaults.baseURL.replace('api/v1/pgp', '') + photo : backgroundUrl})` }"></div>



            <div class="product-info pl-2 py-3 pr-3">
                <div class="brand mb-2">{{ brand }}</div>

                <div class="title">{{ title }}</div>
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
                type: String,
                default: ''
            },
            brand: {
                type: String
            },
            title: {
                type: String
            },
            photo: {}
        }
    }
</script>

<style scoped lang="scss">



    .product-card {
        display: flex;
        flex-direction: row;
        height: 100%;
        min-height: 200px;
        border-radius: 6px;

        &:active {
            box-shadow: none!important;
        }

    }


    .product-img {
        overflow: hidden;
        margin: 8px;
        border-radius: 6px;
        min-width: 140px;
        width: 140px;
        background-size: cover;
        height: auto;
        background-position: center;
        border: 1px solid #eceef7;


    }

    .product-info {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;


        .title {
            flex: 1;
            font-size: 20px;
            line-height: 1.3;
            font-weight: 600;
            color: #070919;
            word-break: break-word;

        }

        .brand {
            font-size: 16px;
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
