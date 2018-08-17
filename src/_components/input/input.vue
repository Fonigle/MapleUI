<template>
    <div :class="['mp-input',
         {lg:isLarge,white:isWhite,centered:isCentered,topless:isTopless,error:errorMessage}]"
         @click="onClick()">
        <input ref="input"
               v-model="currentValue"
               :type="computedType"
               :class="{edited:edited}"
               :maxlength="computedMaxlength"
               :readonly="isReadonly"
               @input="onInput($event)"
               @blur="onBlur($event)"
               @keydown.enter="onEnter($event)"
               @focus="onFocus($event)"
               v-theme:color
               v-theme:divide>
        <label v-theme:color="2"><slot></slot></label>
        <span v-if="tips" class="tips" v-theme:color="3">{{tips}}</span>
        <span class="error-block">{{errorMessage}}</span>
    </div>
</template>
<script>
    import TwoWay from 'two-way';

    const vcomp = {
        mixins: [TwoWay],
        data()
        {
            return {
                errorMessage: '',
                locked: false
            };
        },
        props: ['type', 'maxlength', 'tips', 'readonly', 'lg', 'large', 'white', 'centered'],
        computed: {
            computedType()
            {
                let result = 'text';
                switch (this.type)
                {
                    case 'password': {
                        result = 'password';
                        break;
                    };
                    default: break;
                };

                return result;
            },
            computedMaxlength()
            {
                let result = '';
                const maxlength = this.maxlength;
                if (this.computedType === 'text')
                {
                    !maxlength && (result = maxlength)
                }
                return result;
            },
            isReadonly()
            {
                if (this.readonly || this.readonly === '')
                {
                    return true;
                }
                return false;
            },
            isLarge()
            {
                if (this.lg || this.large || this.lg === '' || this.large === '')
                {
                    return true;
                }
                return false;
            },
            isWhite()
            {
                if (this.white || this.white === '')
                {
                    return true;
                }
                return false;

            },
            isCentered()
            {
                if (this.centered || this.centered === '')
                {
                    return true;
                }
                return false;
            },
            isTopless()
            {
                return !(this.$slots.default)
            },
            edited()
            {
                return this.currentValue !== '' && this.currentValue !== undefined;
            },
        },
        methods: {
            onClick()
            {
                this.$emit('click');
            },
            onInput(event)
            {
                this.errorMessage = '';
            },
            onBlur(event)
            {
                this.$emit('blur');
            },
            onEnter(e, a)
            {
                this.$emit('enter');
            },
            onFocus(event)
            {
                this.$emit('focus');
            },
            error(message)
            {
                this.errorMessage = message;
            },
            focus()
            {
                this.$refs.input.focus();
            },
            blur()
            {
                this.$refs.input.blur();
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./input.scss" scoped></style>