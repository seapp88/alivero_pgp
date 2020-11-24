<template>
    <div class="page-container">

        <div class="content-wrapper">
            <div class="card full-height-card d-flex flex-row overflow-hidden border">
                <div class="stock-col col-stock d-flex flex-column">
                    <div class="stock-col-header p-3 border-bottom shadow-xs-bottom">
                        <h5 class="font-weight-bold mb-2">Склады</h5>
                    </div>

                    <div class="stock-list-empty p-4" v-if="!listStock.length">
                        <i class="fa fa-exclamation-triangle mb-4 font-size-xxl"></i>
                        <div class="font-weight-bold mb-2 font-size-lg">
                            Вы еще не создали ни одного склада
                        </div>
                        <div class="pb-5">
                            Чтобы создать склад обратитесь к администратору.
                        </div>
                    </div>

                    <div class="stock-list py-2 flex-grow-1" v-else>

                        <div class="stock-item px-4 text-dark border-bottom d-flex align-items-center justify-content-between pointer"
                             v-for="(stock, index) in listStock"
                             :class="{active: stock.id === selectStock}"
                             @click="selectStock = stock.id"
                             :key="index">
                            <div class="stock-item-title pr-2  font-weight-bold text-clip">{{ stock.name }}</div>
                            <div class="stock-item-icon d-none"><i class="fa fa-chevron-right"></i></div>
                        </div>

                    </div>


                </div>

                <div class="stock-col col-rack d-flex flex-column shadow-sm bg-white">
                    <div class="stock-col-header bg-white p-3 border-bottom shadow-xs-bottom">
                        <h5 class="font-weight-bold mb-2">Стеллажи</h5>
                    </div>


                    <div class="stock-list-no-select p-4" v-if="!selectStock">
                        <i class="fa fa-arrow-left mb-4 font-size-xxl"></i>
                        <div class="font-weight-bold pb-5 font-size-lg">
                            Чтобы выбрать стеллаж,</br> выберите склад из списка
                        </div>
                    </div>

                    <div class="stock-list-empty p-4" v-if="selectStock && !listRack.length">
                        <i class="fa fa-arrow-up mb-4 font-size-xxl"></i>
                        <div class="font-weight-bold mb-2 font-size-lg">
                            Список стеллажей пуст
                        </div>
                        <div class="pb-5">
                            Чтобы создать стеллаж обратитесь к администратору.
                        </div>
                    </div>

                    <div class="stock-list py-2 flex-grow-1" v-if="selectStock && listRack.length">

                        <div class="stock-item px-4 text-dark border-bottom d-flex align-items-center justify-content-between pointer"
                             v-for="(i, index) in listRack"
                             @click="selectRack = i.id"
                             :key="index"
                             :class="{active: i.id === selectRack}">
                            <div class="stock-item-title pr-2  font-weight-bold text-clip">{{ i.name }}</div>
                            <div class="stock-item-icon d-none"><i class="fa fa-chevron-right"></i></div>
                        </div>

                    </div>


                </div>

                <div class="stock-col col-cell d-flex flex-column  shadow-sm bg-white">
                    <div class="stock-col-header bg-white p-3 border-bottom shadow-xs-bottom">
                        <div class="d-flex align-items-center mb-2">
                            <h5 class="font-weight-bold mb-0 flex-grow-1">Ячейки</h5>
                            <button :disabled="!selectRack" class="btn font-size-sm btn-primary"><span class="btn-wrapper--icon"><i class="fa fa-print"></i></span><span class="btn-wrapper--label">Распечатать все</span></button>
                        </div>
                    </div>

                    <div class="stock-list-no-select p-4" v-if="!selectRack">
                        <i class="fa fa-arrow-left mb-4 font-size-xxl"></i>
                        <div class="font-weight-bold pb-5 font-size-lg">
                            Чтобы выбрать ячейку,</br> выберите стеллаж из списка
                        </div>
                    </div>

                    <div class="stock-list-empty p-4" v-if="selectRack && !listCell.length">
                        <i class="fa fa-arrow-up mb-4 font-size-xxl"></i>
                        <div class="font-weight-bold mb-2 font-size-lg">
                            Список ячеек пуст
                        </div>
                        <div class="pb-5">
                            Чтобы создать ячейку обратитесь к администратору.
                        </div>
                    </div>

                    <div class="stock-list py-2 flex-grow-1" v-if="selectRack && listCell.length">

                        <div class="stock-item px-4 text-dark border-bottom d-flex align-items-center justify-content-between pointer"
                             v-for="(i, index) in listCell" :key="index">
                            <div class="stock-item-title pr-2  font-weight-bold text-clip">{{ i.name }}</div>
                            <div class="stock-item-icon d-none"><i class="fa fa-chevron-right"></i></div>
                        </div>

                    </div>


                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                listStock: [],
                listRack: [],
                listCell: [],
                selectStock: null,
                selectRack: null,
                selectCell: null
            }
        },
        watch: {
            selectStock(){
                this.getRack();
                this.listCell = [];
                this.selectRack = null;
                this.selectCell = null;
            },
            selectRack(){
                this.getCell();
                this.selectCell = null;
            },
            selectCell(val){
                // this.$store.dispatch('dataset/setCell', val)
            }
        },
        created(){
            this.getStock();
        },
        methods: {
            async getStock(){
                try{
                    let { data } = await this.$http.get('/stock');
                    this.listStock = data;
                    return Promise.resolve()
                }catch (e) {
                    console.log(e)
                }
            },
            async getRack(){
                try{
                    let { data } = await this.$http.get('/stock-rack/' + this.selectStock);
                    this.listRack = data;
                    return Promise.resolve()
                }catch (e) {
                    console.log(e)
                }
            },
            async getCell(){
                try{
                    let { data } = await this.$http.get('/stock-rack-cell/' + this.selectRack);
                    this.listCell = data;
                    return Promise.resolve()
                }catch (e) {
                    console.log(e)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .content-wrapper {
        overflow-y: auto;
        flex: 1;
        height: calc(100vh - 115px);
        background-color: #e7e9f5;
    }

    .stock-col {
        flex: 1;
        height: calc(100vh - 117px);

        &.col-stock {
            z-index: 3;
        }

        &.col-rack {
            z-index: 2;
        }


    }

    .stock-list-empty, .stock-list-no-select {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: center;
        text-align: center;

    }

    .stock-list-no-select {
        opacity: 0.6;
    }


    .stock-list {
        overflow-y: auto;
        height: calc(100vh - 232px);
    }

    .stock-col-header {
        h5 {
            line-height: 40px;
        }
    }


    .stock-item {
        padding: 12px 0;

        .stock-item-title {
            transition: 0.2s all ease;
        }


        &:hover {
            .stock-item-title {
                padding-left: 5px;
                color: #3c44b1;

            }

            background-color: rgba(255, 255, 255, 0.31);
        }

        &.active {
            background-color: #3c44b1;
            color: #ffffff !important;


            .stock-item-icon {
                display: block !important;
            }

            &:hover {

                .stock-item-title {
                    padding-left: 5px;
                    color: #ffffff;
                }

            }
        }
    }

    .table-hover tr {
        &:hover {
            background-color: #F4F5FD !important;
        }

    }


    .item-delete-btn {
        transition: all 0.3s ease 0s;

        .btn {
            padding: 4px 8px;
            background-color: white;
            border-color: transparent;


            i {
                font-size: 12px;

            }
        }

    }

    .item-edit-btn {
        transition: all 0.3s ease 0s;


        .btn {
            padding: 4px 8px;
            background-color: white;
            border-color: transparent;


            i {
                font-size: 12px;

            }
        }
    }

    .btn-outline-danger:hover {
        background-color: #f83245;

    }

    .btn-outline-primary:hover {
        background-color: #FFFFFF;
        color: #3C44B1;
    }

    .col-cell {
        .stock-item {

            &.active {
                .stock-item-icon {
                    display: none !important;
                }

            }
        }
    }
</style>
