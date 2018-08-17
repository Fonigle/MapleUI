<template>
    <div class="mp-number-picker">
        <button :class="['btn-minus',{disabled:minDisabled}]" @click="handleBtnMinusClick" v-theme:background.hover="30">
            <i class="mp-icon mp-icon-minus" v-theme:color="2"></i>
        </button>
        <input v-model="currentValue" @blur="handleInputBlur" @mousewheel="handleInputMousewheel" @DOMMouseScroll="handleInputDOMMouseScroll" v-theme:color />
        <button :class="['btn-add',{disabled:maxDisabled}]" @click="handleBtnPlusClick" v-theme:background.hover="30">
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

                if ((min || min === 0) && currentValue <= min) return true;
                else return false;
            },
            maxDisabled()
            {
                const currentValue = parseInt(this.currentValue);
                const max = parseInt(this.max);

                if ((max || max === 0) && currentValue >= max) return true;
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
            },
            handleInputMousewheel($event)
            {
                const currentValue = parseInt(this.currentValue);
                const min = parseInt(this.min);
                const max = parseInt(this.max);

                if ($event.deltaY < 0)
                {
                    if (!max)
                    {
                        this.currentValue++;
                    }
                    else if (currentValue < max)
                    {
                        this.currentValue++;
                    }
                }
                else if ($event.deltaY > 0)
                {


                    if (!min)
                    {
                        this.currentValue--;
                    }
                    else if (currentValue > min)
                    {
                        this.currentValue--;
                    }
                }
            },
            handleInputDOMMouseScroll($event)
            {
                const currentValue = parseInt(this.currentValue);
                const min = parseInt(this.min);
                const max = parseInt(this.max);

                if ($event.detail < 0)
                {
                    if (!max)
                    {
                        this.currentValue++;
                    }
                    else if (currentValue < max)
                    {
                        this.currentValue++;
                    }
                }
                else if ($event.detail > 0)
                {


                    if (!min)
                    {
                        this.currentValue--;
                    }
                    else if (currentValue > min)
                    {
                        this.currentValue--;
                    }
                }
            }
        },
        mounted()
        {

        },
        watch: {
            min()
            {
                if ((min || min === 0) && this.currentValue < min) this.currentValue = min;
            },
            max()
            {
                if ((max || max === 0) && this.currentValue < max) this.currentValue = max;
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./number.scss" scoped></style>