<template>
    <div class="page-container">
<!--        <menu-bar></menu-bar>-->

        <div class="content-wrapper">
            <router-view :key="$route.fullPath"></router-view>
        </div>

    </div>

</template>

<script>
    import MenuBar from './components/menu_bar/Index'

    export default {
        components: {
            MenuBar
        }
    }
</script>

<style scoped>

    .content-wrapper {
        overflow-y: auto;
        flex: 1;
        height: calc(100vh - 115px);
        background-color: #e7e9f5;
    }

</style>
