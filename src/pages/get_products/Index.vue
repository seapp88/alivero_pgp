<template>
    <div>
        <div class="d-flex flex-row">
            <menu-bar></menu-bar>

            <div class="content-wrapper">
                <router-view :key="$route.fullPath"></router-view>
            </div>
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
        height: calc(100vh - 124px);

    }

</style>
