<template>
    <button :class="['mp-btn-icon',{'mp-disabled':isDisabled}]" @click.stop="clickEvent()">
        <slot></slot>
    </button>
</template>
<script>
    const vcomp = {
        data()
        {
            return {

            };
        },
        props: ['disabled'],
        computed: {
            isDisabled()
            {
                if (this.disabled || this.disabled === '') return true;
                else return false;
            }
        },
        methods: {
            clickEvent()
            {
                !this.isDisabled && this.$emit('click');
            }
        },
        mounted()
        {

        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./btn-icon.scss" scoped></style>