<template>
    <router-link :to="to" class="menu-item" :exact="to === '/get-products'">
       <div class="menu-item-icon">
           <i :class="icon"></i>
       </div>
        <div class="menu-item-title">

            {{ title }}
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            },
            icon: {
                type: String
            },
            to: {
                type: String
            },
        }
    }
</script>

<style scoped lang="scss">
    .menu-item{
        width: 136px;
        height: 136px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #3e486d;
        color: #ffffff;
        border-radius: 12px;
        padding: 10px;
        text-align: center;
        margin: 0 0 8px 0;

        &:active {
            background-color: #353f64;

        }

        .menu-item-icon {
            margin-top: 5px;
            padding-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
                font-size: 40px;
                line-height: 1;
            }
        }

        .menu-item-title {
            font-size: 13px;
            font-weight: 600;
        }

        &.router-link-active{
            background-color: #3c44b1;
            &:active {
                background-color: #3b439c;

            }
        }
    }
</style>
