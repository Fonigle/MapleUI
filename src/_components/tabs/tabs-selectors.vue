<template>
    <div class="mp-tabs-selectors" v-theme:background="11" v-theme:level="1">
        <div class="mp-tabs-selector" v-for="(item,index) of selectorList" v-theme:color="0" @click="selectorClick(index)">{{item.label}}</div>
        <div class="mp-tabs-bar-wrapper">
            <div class="mp-tabs-bar" :style="barStyle"></div>
        </div>
    </div>
</template>
<script>
    const vcomp = {
        props: ['contents', 'active'],
        data()
        {
            return {

            };
        },
        computed: {
            selectorList()
            {
                const contents = this.contents;

                let result = [];

                let idx = 0;
                for (let item of contents)
                {
                    const label = item.label || item.name || `tab-${idx}`;

                    result.push({
                        label
                    });

                    idx += 1;
                }

                return result;
            },
            barStyle()
            {
                return `width:${1 / this.contents.length * 100}%;transform:translateX(${this.active * 100}%);`
            }
        },
        methods: {
            selectorClick(index)
            {
                this.$emit('change', index);
            }
        },
        mounted()
        {
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./tabs-selectors.scss" scoped></style>