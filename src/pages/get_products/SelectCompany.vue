<template>
    <div class="p-5 d-flex flex-column align-items-center justify-content-center" style="min-height: 100%">
        <div class="page-title mb-4">
            Выберите компанию
        </div>

        <div class="container">
            <div class="d-flex flex-column">
                <div class="company-item bg-primary p-4 rounded w-100 text-center text-white font-weight-bold font-size-xl mb-3" v-for="company in $store.state.dataset.companies" @click="selectCompany(company.id)">{{ company.name }}</div>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        methods: {
            selectCompany(id){
                this.$router.push('/get-products/' + id)
            }
        }
    }
</script>

<style scoped>

    .company-item:active {
        background-color: #363e85!important;
    }

</style>
