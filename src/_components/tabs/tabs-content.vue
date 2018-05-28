<template>
    <div class="mp-tabs-content">
        <slot></slot>
    </div>
</template>
<script>
    const vcomp = {
        data()
        {
            return {
            };
        },
        props: ['label', 'name'],
        methods: {

        },
        mounted()
        {
            this.$parent.addContent(this);
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./tabs-content.scss" scoped></style>