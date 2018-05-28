<template>
    <label v-if="inGroup" :class="['mp-radio-item',{'mp-disabled':isDisabled}]" :style="computedStyle" v-ripple>
        <span ref="tips" class="tips" v-theme:color><slot></slot></span>
        <input type="radio" :value="value" :name="parentName" v-model="currentValue" :disabled="isReadonly||isDisabled" />
        <i></i>
    </label>
</template>
<script>
    const vcomp = {
        identifier: 'mpRadioItem',
        props: ['value', 'readonly', 'disabled'],
        data()
        {
            return {
            };
        },
        computed: {
            isReadonly()
            {
                if (this.readonly || this.readonly === '') return true;
                else return false;
            },
            isDisabled()
            {
                if (this.disabled || this.disabled === '') return true;
                else return false;
            },
            inGroup()
            {
                return this.$parent.$options.identifier === 'mpRadioGroup'
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

                const height = tips.offsetHeight;
                const width = tips.offsetWidth;

                const uid = this._uid;

                this.$parent.setStyles(uid, width, height);
            }
        },
        mounted()
        {
            this.$nextTick(() =>
            {
                this.postStyle();
            });
        },
        updated()
        {
            this.$nextTick(() =>
            {
                this.postStyle();
            });
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./radio-item.scss" scoped></style>