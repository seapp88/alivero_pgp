<template>
    <div>
        Выберите компанию

        <div v-for="company in $store.state.dataset.companies" @click="selectCompany(company.id)">{{ company.name }}</div>

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

</style>
