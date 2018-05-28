<template>
    <button class="mp-btn-circular"
            v-theme:background="21"
            v-theme:background.active="1"
            v-theme:level="3"
            @click="click()"
            :class="{top:top,bottom:bottom,left:left,right:right}">
        <slot></slot>
    </button>
</template>
<script>
    const vcomp = {
        data()
        {
            return {
                left: false,
                right: false,
                top: false,
                bottom: false
            };
        },
        methods: {
            click()
            {
                this.$emit('click');
            },
            calcPosition()
            {
                const top = this.$el.offsetTop;
                const left = this.$el.offsetLeft;

                const bottom = this.$el.offsetParent.offsetHeight - top;
                const right = this.$el.offsetParent.offsetWidth - left;

                top > bottom ? this.bottom = true : this.top = true;
                left > right ? this.right = true : this.left = true;
            }
        },
        mounted()
        {
            this.calcPosition();
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./btn-circular.scss" scoped></style>