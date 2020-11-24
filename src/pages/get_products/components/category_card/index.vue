<template>
    <router-link :to="'/get-products/' + $route.params.company_id + '/category/' + title">
        <div class="category-card card card-box px-4 py-5">
            {{ title }}
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            }
        }
    }
</script>

<style scoped lang="scss">
    .category-card {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 20px;
        line-height: 1.3;
        color: #ffffff;
        background-color: #3c44b1;


        &:active {
            box-shadow: none;
            background-color: #3c449f;

        }
    }

</style>
