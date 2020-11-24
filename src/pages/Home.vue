<template>
    <div class="page-container">

        <div class="content-wrapper content-wrapper-menu">
            <div class="alert-wrapper">
                <div class="alert d-flex align-items-center pl-2 align-content-center alert-danger alert-dismissible fade show mb-4"
                     role="alert" v-if="!this.$store.state.dataset.printer">
                    <span class="font-size-lg d-block d-40 mr-2 text-center"><i class="fas fa-exclamation-triangle"></i></span>
                    <span><strong class="d-block">Выберите принтер!</strong>Перейдите в Настройки, чтобы выбрать принтер для печати этикеток.</span>
                </div>

                <div class="alert d-flex align-items-center pl-2 align-content-center alert-danger alert-dismissible fade show mb-4"
                     role="alert" v-if="!this.$store.state.dataset.stock_rack_cell_id">
                    <span class="font-size-lg d-block d-40 mr-2 text-center"><i class="fas fa-exclamation-triangle"></i></span>
                    <span><strong class="d-block">Выберите место хранения!</strong> Чтобы принять товар, перейдите в настройки и назначьте место хранения.</span>
                </div>
            </div>


            <div class="menu-grid">
                <router-link to="/get-products">
                    <div class="card card-body h-100 bg-primary">
                        <div class="menu-item">
                            <div class="icon">
                                <i class="fa fa-box-open"></i>
                            </div>
                            <div class="header">
                                Приемка товара
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/get-products">
                    <div class="card card-body h-100 bg-primary">
                        <div class="menu-item">
                            <div class="icon">
                                <i class="fa fa-tags"></i>
                            </div>
                            <div class="header">
                                Повторная печать этикеток
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/stock-print">
                    <div class="card card-body h-100 bg-primary">
                        <div class="menu-item">
                            <div class="icon">
                                <i class="fa fa-qrcode"></i>
                            </div>
                            <div class="header">
                                Маркировка мест хранения
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/settings">
                    <div class="card card-body h-100 bg-primary">
                        <div class="menu-item">
                            <div class="icon">
                                <i class="fa fa-cog"></i>
                            </div>
                            <div class="header">
                                Настройки
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    .content-wrapper {
        overflow-y: auto;
        flex: 1;
        height: calc(100vh - 115px);
        background-color: #e7e9f5;
    }

    .content-wrapper-menu {
        display: flex;
        flex-direction: column;
        padding: 24px;

    }



    .menu-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        grid-auto-rows: 1fr;
        flex: 1
    }

    .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: white;

        .icon {
            font-size: 60px;
            line-height: 1;
            margin-bottom: 30px;
        }

        .header {
            font-size: 24px;
            font-weight: bold;
        }
    }
</style>
