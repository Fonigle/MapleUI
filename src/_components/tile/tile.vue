<template>
    <div class="mp-tile">
        <div class="mp-tile-wrappper" v-theme:level v-theme:background>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    const vcomp = {
        data()
        {
            return {

            };
        },
        methods: {

        },
        mounted()
        {

        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./tile.scss" scoped></style>