<template>
    <div class="menu-wrapper">
        <menu-item title="Главная" icon="flaticon-home" to="/get-products" class="menu-item-main"/>

        <div class="menu-swiper">
            <div class="menu-nav-btn"
                 v-long-press="300"
                 @long-press-start="autoScrollUpStart"
                 @long-press-stop="autoScrollUpStop"
                 @click="scrollUp">
                <i class="fa fa-angle-up"></i>
            </div>

            <div class="menu-container" ref="menu">

                <menu-item class="swiper-slide" v-for="(item, index) in $store.state.dataset.templates" :key="index" :title="item.name" :icon="item.icon" :to="'/get-products/' + item.id" />

            </div>

            <div class="menu-nav-btn"
                 v-long-press="300"
                 @long-press-start="autoScrollBottomStart"
                 @long-press-stop="autoScrollBottomStop"
                 @click="scrollDown">
                <i class="fa fa-angle-down"></i>

            </div>
        </div>



    </div>
</template>

<script>
    import MenuItem from './MenuItem'

    export default {
        components: {
            MenuItem
        },
        data(){
            return {
                scrollUpInterval: null,
                scrollDownInterval: null,
            }
        },
        methods: {
            scrollUp(){
                this.$refs.menu.scrollTo({
                    top: this.$refs.menu.scrollTop - 145,
                    behavior: "smooth"
                })
            },
            scrollDown(){
                this.$refs.menu.scrollTo({
                    top: this.$refs.menu.scrollTop + 145,
                    behavior: "smooth"
                })
            },
            autoScrollUpStart(){
                this.scrollUpInterval = setInterval(() => {
                    this.scrollUp();
                }, 100)
            },
            autoScrollUpStop(){
                clearInterval(this.scrollUpInterval)
            },
            autoScrollBottomStart(){
                this.scrollDownInterval = setInterval(() => {
                    this.scrollDown();
                }, 100)
            },
            autoScrollBottomStop(){
                clearInterval(this.scrollDownInterval)
            }
        }
    }
</script>

<style scoped lang="scss">
    .menu-wrapper {
        display: flex;
        flex-direction: column;
        background-color: #303659;
        width: 180px;
        min-width: 180px;
        max-width: 180px;
        overflow-y: hidden;
        align-items: center;
        padding: 10px;
    }

    .menu-item-main {
        width: 96%;
    }

    .menu-swiper {
        background-color: rgba(7, 9, 25, 0.5);
        width: 100%;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        height: calc(100vh - 279px);
    }

    .menu-container {
        overflow-y: auto;
        /*flex: 1;*/
    }

    .menu-container::-webkit-scrollbar {
        display: none;
    }

    .menu-nav-btn {
        width: 100%;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;

        i {
            font-size: 36px;
            line-height: 1;
        }
    }

</style>
