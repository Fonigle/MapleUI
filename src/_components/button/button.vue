<template>
    <button class="mp-button" v-if="!isRaised" v-theme:background="'transparent'" v-theme:background.hover="1" v-theme:level.hover="2" @click="$emit('click')">
        <slot></slot>
    </button>
    <button class="mp-button mp-button-rasied" v-else v-theme:background v-theme:level="1" v-theme:level.hover="3" @click="$emit('click')">
        <slot></slot>
    </button>
</template>
<script>
    const vcomp = {
        props: ['raised'],
        data()
        {
            return {

            };
        },
        computed: {
            isRaised()
            {
                if (this.raised || this.raised === '') return true;
                else return false;
            }
        },
        methods: {

        },
        mounted()
        {

        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./button.scss" scoped></style>