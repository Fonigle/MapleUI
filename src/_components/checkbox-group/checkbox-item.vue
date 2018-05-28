<template>
    <label v-if="inGroup" class="mp-checkbox-item" :style="computedStyle">
        <span ref="tips" class="tips" v-theme:color><slot></slot></span>
        <input type="checkbox" :value="value" :name="parentName" v-model="currentValue" />
        <i></i>
    </label>
</template>
<script>
    const vcomp = {
        identifier: 'mpCheckboxItem',
        props: ['value'],
        data()
        {
            return {
            };
        },
        computed: {
            inGroup()
            {
                return this.$parent.$options.identifier === 'mpCheckboxGroup'
            },
            parentName()
            {
                return this.$parent.name;
            },
            currentValue: {
                get()
                {
                    return this.$parent.currentValue
                },
                set(value)
                {
                    this.inGroup && this.$parent.$emit('valueChanged', value);
                }
            },
            computedStyle()
            {
                return this.$parent.computedStyle;
            }
        },
        methods: {
            postStyle()
            {
                const tips = this.$refs.tips;

                const height = tips.scrollHeight;
                const width = tips.scrollWidth;
                console.log(height, width);

                const uid = this._uid;

                this.$parent.setStyles(uid, width, height);
            }
        },
        mounted()
        {
            this.postStyle();
        },
        updated()
        {
            this.postStyle();
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./checkbox-item.scss" scoped></style>