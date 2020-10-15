<template>
    <router-view></router-view>
</template>

<script>
    export default {
        async created() {
            try{
                // let { data } = await this.$http.get('/tablet');
                // console.log(data)
            }catch (e) {
                console.log(e)
            }
        }
    }
</script>

<style lang="scss">
    body {
        height: 100vh;
        overflow-y: hidden;
        background-color: #eceef7 !important;
        user-select: none;
    }

    .pointer {
        cursor: pointer;
    }

    .page-container {
        display: flex;
        flex-direction: row;
        height: calc(100vh - 115px);

    }

    .page-title {
        font-size: 32px;
        color: #070919;
        font-weight: 600;
        line-height: 52px;
    }


    .product-grid {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-auto-rows: 1fr;
        grid-gap: 24px;
        padding: 20px;
    }

    .step-title {
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 10px;
    }


</style>
