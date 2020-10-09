<template>
    <div class="main-layout">
        <app-header></app-header>
        <div class="app-content">
            <router-view></router-view>
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
    }

</style>
