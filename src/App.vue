<template>
    <div>
        <div class="web-font">{{title}}</div>
        <img src="../src/assets/imgs/kitty.jpg" class="logo"/>
        <div class="logo"></div>
        <p class="text">学些vue，哈哈哈哈</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '琴棋书画不会，洗衣做饭嫌累！'
            }
        },
    }
</script>

<style lang="less">
    .text{
        color: green;
        font-size: 20px;
    }
</style>