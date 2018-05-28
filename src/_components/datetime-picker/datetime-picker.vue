<template>
    <div v-if="!isRange" class="mp-datetime-picker">
        <mp-input :bindValue="singleDisply" @click="inputClick" readonly :centered="centered"><slot></slot></mp-input>
        <transition name="mp-slide-down">
            <div v-if="popoutShow" class="mp-datetime-picker-popout" v-theme:background v-theme:level="3">
                <dtp-selector v-model="singleTime" :format="format" :test="1" :min="minValue" :max="maxValue"></dtp-selector>
            </div>
        </transition>
    </div>
    <div v-else class="mp-datetime-picker mp-datetime-picker-range">
    </div>
</template>
<script>
    import TwoWay from 'two-way';
    import DtpSelector from './selector/selector.vue';

    const vcomp = {
        mixins: [TwoWay],
        props: ['range', 'format', 'min', 'max'],
        data()
        {
            return {
                onError: false,
                popoutShow: false
            };
        },
        computed: {
            isRange()
            {
                return $maple.singleDirectiveProp(this.range);
            },
            singleDisply()
            {
                const date = new Date(this.singleTime);
                //console.log($maple.dateFormat(date, this.format || 'yyyy/MM/dd hh:mm:ss'));

                return $maple.dateFormat(date, this.format || 'yyyy/MM/dd hh:mm:ss');
            },
            startValue()
            {
                if (!this.onError)
                {
                    return this.currentValue[0];
                }
            },
            endValue()
            {
                if (!this.onError)
                {
                    return this.currentValue[1];
                }
            },
            minValue()
            {
                const min = this.min;
                if (!min || isNaN(new Date(min))) return '';
                else return new Date(min);
            },
            maxValue()
            {
                const max = this.max;
                if (!max || isNaN(new Date(max))) return '';
                else return new Date(max);
            },
            singleTime: {
                get()
                {
                    return this.currentValue.getTime();
                },
                set(val)
                {
                    this.currentValue = new Date(val);
                }
            }
        },
        components: {
            DtpSelector
        },
        methods: {
            validate()
            {
                const { isRange, currentValue, min, max } = this;

                if (!isRange && !(currentValue instanceof Date))
                {
                    $maple.errorLog('DatetimePicker', 'The v-model attr must be a Date Object');
                    this.onError = true;
                }

                if (isRange)
                {
                    if (!(currentValue instanceof Array))
                    {
                        $maple.errorLog('DatetimePicker', 'The v-model value must be a Array while in RANGE mode');
                        this.onError = true;
                    }
                    else if ((!(currentValue[0] instanceof Date)) || (!(currentValue[1] instanceof Date)))
                    {
                        $maple.errorLog('DatetimePicker', 'The v-model value must contains two items both are Date Object');
                        this.onError = true;
                    }
                }

                if (min && isNaN(new Date(min)))
                {
                    $maple.errorLog('DatetimePicker', 'The "min" prop must be a String can be formated to Date');
                    this.onError = true;
                }

                if (max && isNaN(new Date(max)))
                {
                    $maple.errorLog('DatetimePicker', 'The "max" prop must be a String can be formated to Date');
                    this.onError = true;
                }
            },
            inputClick()
            {
                this.popoutShow = !this.popoutShow;
            }
        },
        mounted()
        {
            this.validate();
        },
        watch: {
            currentValue()
            {
                this.validate();
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./datetime-picker.scss" scoped></style>