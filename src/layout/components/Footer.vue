<template>
    <div class="app-footer d-flex flex-row align-items-center justify-content-between px-3 pb-2 pt-0 text-white-50">
        <div class="ited-wrapper d-flex flex-grow-1">Copyright © Alivero WMS by ITED.PRO</div>
        <div class="info-wrapper d-flex align-items-center">
            <div class="connection-status" v-if="$store.state.connectToServer">
                <i class="fa fa-wifi pr-2 text-success"></i>Connect to server: ONLINE
            </div>
            <div class="connection-status" v-else>
                <i class="fa fa-wifi pr-2 text-danger"></i>Connect to server: OFFLINE
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        created(){
            moment.locale('ru');
            this.setDateOfClock();
            setInterval(() => {
                this.setDateOfClock()
            }, 5000)
        },
        data(){
            return {
                time: null,
                date: null,
            }
        },
        methods: {
            setDateOfClock(){
                let now = moment();
                this.date = now.format("dddd DD.MM.YYYY");
                this.time = now.format("HH:mm")
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-footer {
        background-color: #070919;
        font-size: 13px;
    }
    .date:first-letter{
        text-transform: uppercase;
    }

</style>
