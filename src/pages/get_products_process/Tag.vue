<template>
    <div class="p-4">
        <div class="step-title mb-3">Вы можете выбрать любое количество тегов</div>


        <div class="card-chooser card">

            <div class="tags-container p-4">
                <div class="tag-grid">
                    <div class="tag-item"
                         v-for="tag in $store.state.dataset.tags"
                         :class="{active: $store.getters['selectedData/isTagActive'](tag.id)}"
                         @click="$store.dispatch('selectedData/setTag', tag.id)">
                        {{ tag.name }}
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">

    .card-chooser {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
    }

    .tags-container {
        flex: 1;
        overflow-y: auto;
        height: calc(100vh - 215px);
    }

    .tag-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 15px;
        grid-auto-rows: 1fr;
    }

    .tag-item {
        padding: 24px 20px;
        border-radius: 4px;
        border: #3c44b1 1px solid;
        background-color: rgba(60, 68, 177, 0.06);
        color: #3c44b1;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        &.active {
            background-color: #3c44b1;
            color: white;
        }

        &:active {
            background-color: rgba(60, 68, 177, 0.11);
        }


    }


</style>
