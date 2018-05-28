<template>
    <div :class="[`mp-${type}`,{'mp-disabled':isDisabled}]">
        <label @click="ripple($event)">
            <span class="tips" v-theme:color><slot></slot></span>
            <span ref="inputWapper" v-if="type" class="input-wapper">
                <input v-if="type==='checkbox'" type="checkbox" :value="value" :name="name" v-model="currentValue" :disabled="isDisabled" />
                <input v-else-if="type==='radio'" type="radio" :value="value" :name="name" v-model="currentValue" :disabled="isDisabled" />
                <input v-else-if="type==='toggle'" type="checkbox" v-model="currentValue" :disabled="isDisabled" />
                <i :class="{'reverse-color':isReverseColor}"></i>
            </span>
        </label>
    </div>
</template>
<script>
    import TwoWay from '../../_mixins/two-way/two-way';

    const vcomp = {
        mixins: [TwoWay],
        data()
        {
            return {};
        },
        props: ['type', 'name', 'reverse-color', 'value', 'disabled'],
        computed: {
            isReverseColor()
            {
                const reverseColor = this.reverseColor;
                if (!this.reverseColor && this.reverseColor !== '')
                {
                    return false;
                }
                else
                {
                    return true;
                }
            },
            isDisabled()
            {
                if (this.disabled || this.disabled === '')
                {
                    return true;
                }
                return false;
            }
            //computedInputType()
            //{
            //    const type = this.type;
            //    if (type === 'checkbox' || type === 'toggle')
            //    {
            //        return 'checkbox'
            //    }
            //    else if (type === 'radio')
            //    {
            //        return 'radio'
            //    }
            //    else
            //    {
            //        return false;
            //    }
            //}
        },
        methods: {
            ripple(event)
            {
                const _this = this;

                if (event.target.nodeName === 'INPUT')
                {
                    const ripple = document.createElement('b');
                    ripple.classList.add('mp-choices-ripple');

                    this.$refs.inputWapper.appendChild(ripple);

                    setTimeout(() =>
                    {
                        _this.$refs.inputWapper && ripple && _this.$refs.inputWapper.removeChild(ripple);
                    }, 500)
                }

            }
        },
        mounted()
        {

        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./choices.scss" scoped></style>
<style lang="scss" src="./choices-noscoped.scss"></style>
