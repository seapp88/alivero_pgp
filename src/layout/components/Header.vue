<template>
    <div class="app-header d-flex flex-row align-items-center justify-content-between px-3">
        <div class="logo-wrapper d-flex flex-grow-1 align-items-center">
            <div class="app-logo pl-1 pr-3">
                <img src="@/assets/img/alivero-img/AWMS_logo.svg" alt="">
            </div>
            <div class="app-title text-white  mb-0 mt-2">Alivero WMS</div>
        </div>
        <div class="action-wrapper">
            <div class="btn-header btn-settings mr-3 pointer" @click="$router.push('/settings')">
                <i class="fa fa-cog"></i>
                Настройки
            </div>
            <div class="btn-header btn-logout pointer" @click="exitApp">
                Закрыть приложение
                <i class="fa fa-sign-out-alt pl-2"></i>
            </div>
        </div>
    </div>
</template>

<script>
    const { ipcRenderer } = require('electron');
    export default {
        created(){
            ipcRenderer.on('update', (event, arg) => {
                console.log('UPDATE: ', arg)
            })
        },
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
        padding-top: 12px;
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

    .btn-header {
        display: flex;
        align-items: center;
        border-radius: 6px;
        font-weight: 600;
        line-height: 48px;
        height: 48px;
        padding: 0 24px;

        &.btn-logout {
            background-color: rgba(243, 23, 54, 0.3);
            color: #ffffff;
            border: 2px solid rgba(243, 23, 54, 0.3);
        }

        &.btn-settings {
            color: rgba(230, 232, 244, 0.8);
            border: 2px solid rgba(230, 232, 244, 0.51);

            i {
                font-size: 18px;
                padding-right: 10px;
            }
        }
    }




</style>
