<template>
    <div>
        <div class="scrollbar-container p-3">

            <div class="close-btn">
                <button class="btn btn-dark font-size-xxl line-height-md border-0 shadow-none pt-2 pb-1 px-4" type="button" @click="$router.go(-1)">
                    <i class="fa fa-times"></i>
                </button>
            </div>



            <div class="container">

                <div class="setting-cards">
                    <div class="card card-box mb-3">
                        <div class="list-group-item border-top-0 border-left-0 border-right-0 d-flex bg-light align-items-center text-second py-3">
                            <i class="fa fa-database pr-3 font-size-xl"></i>
                            <h5 class="mt-0 mb-0 font-weight-bold font-size-xl">Данные</h5>
                        </div>

                        <div class="card-body d-flex p-4">
                            <button class="btn btn-warning btn-lg font-size-lg mx-3 w-100" type="button" @click="syncData">
                                <i class="fa fa-sync-alt pr-2"></i>
                                Синхронизировать данные
                            </button>

                            <button class="btn btn-outline-second btn-lg font-size-lg mx-3 w-100" type="button" @click="resetCache">
                                <i class="fa fa-eraser pr-2"></i>
                                Очистить кэш
                            </button>
                        </div>
                    </div>

                    <div class="card card-box mb-3">
                        <div class="list-group-item border-top-0 border-left-0 border-right-0 d-flex bg-light align-items-center text-second py-3 ">
                            <i class="fa fa-warehouse pr-3 font-size-xl"></i>
                            <h5 class="mt-0 mb-0 font-weight-bold font-size-xl">Место хранения</h5>
                        </div>

                        <div class="card-body">
                            <div class="font-weight-bold font-size-lg mb-3">
                                Выберите место хранения для принятых товаров
                            </div>

                            <div class="form-row">

                                <div class="col-4 mb-2">
                                    <label for="inputStock">Склад</label>
                                    <select id="inputStock" class="form-control" v-model="selectStock">
                                        <option v-for="(item, index) in listStock" :value="item.id" :key="index">{{ item.name }}</option>
                                    </select>
                                </div>

                                <div class="col-4 mb-2">
                                    <label for="inputRack">Стеллаж</label>
                                    <select id="inputRack" class="form-control" v-model="selectRack">
                                        <option v-for="(item, index) in listRack" :value="item.id" :key="index">{{ item.name }}</option>
                                    </select>
                                </div>

                                <div class=" col-4 mb-2">
                                    <label for="inputCell">Ячейка</label>
                                    <select id="inputCell" class="form-control" v-model="selectCell">
                                        <option v-for="(item, index) in listCell" :value="item.id" :key="index">{{ item.name }}</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="card card-box mb-3">
                        <div class="list-group-item border-top-0 border-left-0 border-right-0 d-flex bg-light align-items-center text-second py-3">
                            <i class="fa fa-print pr-3 font-size-xl"></i>
                            <h5 class="mt-0 mb-0 font-weight-bold font-size-xl">Принтеры</h5>
                        </div>

                        <div class="card-body">
                            <div class="font-weight-bold font-size-lg mb-3">
                                Выберите принтер, который будет использоваться по умолчанию
                            </div>
                            <div class="print-grid">
                                <div class="print-item"
                                     v-for="printer in printerList"
                                     :class="{active: printer.name === $store.state.dataset.printer}"
                                     @click="$store.dispatch('dataset/setPrinter', printer.name)">
                                    <i class="fa fa-print font-size-xl mb-3"></i>
                                    <div class="print-name">{{ printer.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>


        <hr>
    </div>
</template>

<script>

    // const printer = require("@thiagoelg/node-printer");
    const printer = require("printer");

    export default {
        data(){
            return{
                printerList: [],
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
                this.$store.dispatch('dataset/setCell', val)
            }
        },
        created(){
            this.printerList = printer.getPrinters();
            this.getStock()
        },
        methods: {
            syncData(){
                this.$store.dispatch('dataset/setState')
            },
            resetCache(){
                localStorage.removeItem('vuex');
            },
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
    .scrollbar-container {
        height: calc(100vh - 115px);
        overflow-y: auto;
        width: 100%;
        background-color: #ecedf8;
    }

    .container {
        max-width: 860px;
        padding: 0;
    }

    .close-btn {
        position: fixed;
        right: 50px;
        top: 100px;

    }

    .setting-cards {
        display: flex;
        flex-direction: column;
    }

    .print-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
        grid-gap: 15px;
    }

    .print-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px 20px;
        border-radius: 10px;
        background-color: rgba(225, 227, 243, 0.5);
        font-weight: bold;

        &:active {
            background-color: #d6d7e2;
        }

        &.active {
            background-color: #3c44b1;
            color: white;
        }
    }

</style>
