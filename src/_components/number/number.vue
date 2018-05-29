<template>
    <div class="mp-number-picker">
        <button :class="['btn-minus',{disabled:minDisabled}]" @click="handleBtnMinusClick" v-theme:divide.all v-theme:background.hover="30">
            <i class="mp-icon mp-icon-minus" v-theme:color="2"></i>
        </button>
        <input v-model="currentValue" @blur="handleInputBlur" v-theme:divide.top.bottom v-theme:color />
        <button :class="['btn-add',{disabled:maxDisabled}]" @click="handleBtnPlusClick" v-theme:divide.all v-theme:background.hover="30">
            <i class="mp-icon mp-icon-plus" v-theme:color="2"></i>
        </button>
    </div>
</template>
<script>
    import TwoWay from 'two-way';

    const vcomp = {
        mixins: [TwoWay],
        props: ['min', 'max'],
        data()
        {
            return {};
        },
        computed: {
            minDisabled()
            {
                const currentValue = parseInt(this.currentValue);
                const min = parseInt(this.min);

                if (min && currentValue <= min) return true;
                else return false;
            },
            maxDisabled()
            {
                const currentValue = parseInt(this.currentValue);
                const max = parseInt(this.max);

                if (max && currentValue >= max) return true;
                else return false;
            },
        },
        methods: {
            handleBtnMinusClick()
            {
                !this.minDisabled && this.currentValue--;
            },
            handleBtnPlusClick()
            {
                !this.maxDisabled && this.currentValue++;
            },
            handleInputBlur()
            {
                if (isNaN(this.currentValue))
                {
                    this.currentValue = parseInt(this.currentValue);
                }
                else
                {
                    const currentValue = parseInt(this.currentValue);
                    const min = parseInt(this.min);
                    const max = parseInt(this.max);

                    if (currentValue < min) this.currentValue = min;
                    if (currentValue > max) this.currentValue = max;

                }

            }
        },
        mounted()
        {

        },
        watch: {
            currentValue()
            {

            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./number.scss" scoped></style>