<template>
    <div class="mp-drawer-group">
        <div class="group-name" v-if="name" v-theme:color="2">{{name}}</div>
        <div class="items-wrapper">
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
        props: ['name'],
        methods: {

        },
        mounted()
        {

        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./drawer-group.scss" scoped></style>