<template>
    <mp-scroller class="mp-textarea" v-theme:divide.all>
        <p contenteditable
           ref="p"
           @click="$emit('click')"
           @keydown.enter="$emit('enter')"
           @input="onInput($event)"
           @blur="onBlur($event)"
           @focus="onFocus($event)"
           v-theme:color />
    </mp-scroller>
</template>
<script>
    import TwoWay from 'two-way';

    const vcomp = {
        mixins: [TwoWay],
        props: ['html'],
        data()
        {
            return {
                locked: false
            };
        },
        computed: {
            widthTips()
            {
                return this.$slots.default;
            },
            isHtmlMode()
            {
                return $maple.singleDirectiveProp(this.html);
            }
        },
        methods: {
            onInput(event)
            {
                const el = event.target;
                if (el.nodeName === 'P')
                {
                    this.currentValue = this.isHtmlMode ? el.innerHTML : el.innerText;
                };
                this.errorMessage = '';
            },
            onBlur(event)
            {
                const el = event.target;
                if (el.nodeName === 'P')
                {
                    this.locked = false;
                }
                this.$emit('blur');
            },
            onFocus(event)
            {
                const el = event.target;
                if (el.nodeName === 'P')
                {
                    this.locked = true;
                }
                this.$emit('focus');
            },
        },
        mounted()
        {
            if (this.isHtmlMode) this.$refs.p.innerHTML = this.currentValue;
            else this.$refs.p.innerText = this.currentValue;
        },
        watch: {
            bindValue()
            {
                if (!this.locked)
                {
                    if (this.isHtmlMode) this.$refs.p.innerHTML = this.bindValue;
                    else this.$refs.p.innerText = this.currentValue;
                }
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./textarea.scss" scoped></style>