<template>
    <div class="app-footer d-flex flex-row align-items-center justify-content-between px-3 py-auto text-white-50">
        <div class="ited-wrapper d-flex flex-grow-1">Copyright © Alivero WMS by ITED.PRO</div>
        <div class="info-wrapper d-flex align-items-center">
            <div class="connection-status pr-3 border-right border-dark mr-3" v-if="$store.state.connectToServer">
                <i class="fa fa-wifi pr-2 text-success"></i>Connect to server: ONLINE
            </div>
            <div class="connection-status pr-3 border-right border-dark mr-3" v-else>
                <i class="fa fa-wifi pr-2 text-danger"></i>Connect to server: OFFLINE
            </div>
            <div class="date pr-3">{{ date }}</div>
            <div class="time font-weight-bold font-size-md text-white">{{ time }}</div>
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
        height: 38px;
        font-size: 13px;
    }
    .date:first-letter{
        text-transform: uppercase;
    }

</style>
