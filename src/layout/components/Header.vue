<template>
    <div class="app-header d-flex flex-row align-items-center justify-content-between pl-4 pr-3 py-auto">
        <div class="logo-wrapper d-flex flex-grow-1 align-items-center">
            <div class="app-logo pl-1 pr-3">
                <img src="@/assets/img/alivero-img/AWMS_logo.svg" alt="">
            </div>
            <div class="app-title text-white  mb-0 mt-2">Alivero WMS</div>
        </div>
        <div class="action-wrapper">
            <div class="btn-settings mr-3 pointer">
                <i class="fa fa-cog"></i>
                Настройки
            </div>
            <div class="btn-logout pointer" @click="exitApp">
                Закрыть приложение!
                <i class="fa fa-sign-out-alt pl-2"></i>
            </div>
        </div>
    </div>
</template>

<script>
    const { ipcRenderer } = require('electron');
    export default {
        methods: {
            exitApp(){
                ipcRenderer.send('app:quit')
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-header {
        background-color: #070919;
        height: 86px;
    }

    .logo-wrapper {
        .app-logo {
            height: 48px;

            img {
                height: 100%;
            }
        }
    }

    .app-title {
       font-size: 28px;
        font-weight: 600;
    }

    .action-wrapper {
        display: flex;
        align-items: center;
    }

    .btn-logout {
        display: flex;
        align-items: center;
        background-color: #f31736;
        padding: 14px 24px;
        border-radius: 6px;
        color: #ffffff;
        font-weight: 600;
        border: 2px solid #f31736;

    }

    .btn-settings {
        display: flex;
        align-items: center;
        padding: 14px 24px;
        border-radius: 6px;
        color: rgba(230, 232, 244, 0.8);
        font-weight: 600;
        border: 2px solid rgba(230, 232, 244, 0.51);

        i {
            font-size: 18px;
            padding-right: 10px;
        }


    }


</style>
