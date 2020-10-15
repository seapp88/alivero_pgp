<template>
    <div class="main-layout">
        <app-header></app-header>
        <div class="app-content px-3 pt-3 pb-2">
            <div class="app-content-wrapper card card-box overflow-hidden bg-transparent border-second">
                <router-view></router-view>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from './components/Header'
    import AppFooter from './components/Footer'

    export default {
        components: {
            AppHeader,
            AppFooter
        }
    }
</script>

<style scoped>
    .main-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow-y: hidden;

    }
    .app-content {
        overflow-y: hidden;
        flex: 1;
        background-color: #070919;
    }

    .app-content-wrapper {
        background-color: #e7e9f5;
        height: 100%;
    }

</style>
