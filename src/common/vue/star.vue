<template>
    <div class="star">
        <img src="../../assets/img/lack_star.png" alt="">
        <img :style="'clip:rect(auto,'+ score * 84 / 5 +'px,auto,auto);'" src="../../assets/img/full_star.png" alt="">
    </div>
</template>

<script>
export default {
    props: {
        score: Number
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
    .star {
        position: relative;
        >img {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            max-width: initial;
            max-height: initial;
        }
    }
</style>
