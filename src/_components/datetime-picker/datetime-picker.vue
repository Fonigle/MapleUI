<template>
    <div v-if="!isRange" :class="['mp-datetime-picker',{headless:isHeadless}]">
        <mp-input :bindValue="singleDisply" @click="showPopout" readonly><slot></slot></mp-input>
        <transition name="mp-slide-down">
            <div v-if="popoutShow" class="mp-datetime-picker-popout" v-theme:background v-theme:level="3" v-click-outside="hidePopout">
                <dtp-selector v-model="singleTime" :format="format || 'YYYY/MM/DD HH:mm:ss'" :min="minValue" :max="maxValue"></dtp-selector>
            </div>
        </transition>
    </div>
    <div v-else :class="['mp-datetime-picker','mp-datetime-picker-range',{headless:isHeadless}]">
        <mp-input :bindValue="rangeDisply" @click="showPopout" readonly><slot></slot></mp-input>
        <transition name="mp-slide-down">
            <div v-if="popoutShow" class="mp-datetime-picker-popout" v-theme:background v-theme:level="3" v-click-outside="hidePopout">
                <dtp-selector v-model="startTime" :format="format || 'YYYY/MM/DD HH:mm:ss'" :min="minValue" :max="currentValue[1]"></dtp-selector>
                <span class="diliver" v-theme:color="2">~</span>
                <dtp-selector v-model="endTime" :format="format || 'YYYY/MM/DD HH:mm:ss'" :min="currentValue[0]" :max="maxValue"></dtp-selector>
            </div>
        </transition>
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
            isHeadless()
            {
                return !(this.$slots.default);
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

            singleDisply()
            {
                const date = new Date(this.singleTime);

                if (isNaN(date))
                {
                    return '----/--/-- --:--:--';
                }
                else
                {
                    return $maple.dateFormat(date, this.format || 'yyyy/MM/dd hh:mm:ss');
                }
            },
            singleTime: {
                get()
                {
                    if (this.currentValue.getTime)
                    {
                        return this.currentValue.getTime();
                    }
                },
                set(val)
                {
                    this.currentValue = new Date(val);
                }
            },
            startTime: {
                get()
                {
                    if (this.currentValue[0].getTime)
                    {
                        return this.currentValue[0].getTime();
                    }
                },
                set(val)
                {

                    let temp = $maple.deepClone(this.currentValue);

                    temp[0] = new Date(val)
                    this.currentValue = temp;
                }
            },
            endTime: {
                get()
                {
                    if (this.currentValue[1].getTime)
                    {
                        return this.currentValue[1].getTime();
                    }
                },
                set(val)
                {
                    let temp = $maple.deepClone(this.currentValue);

                    temp[1] = new Date(val)
                    this.currentValue = temp;
                }
            },
            rangeDisply()
            {
                const start = new Date(this.startTime);
                const end = new Date(this.endTime);
                const startString = $maple.dateFormat(new Date(start), this.format || 'yyyy/MM/dd hh:mm:ss');
                const endString = $maple.dateFormat(new Date(end), this.format || 'yyyy/MM/dd hh:mm:ss');

                return `${startString} ~ ${endString}`
            },
        },
        components: {
            DtpSelector
        },
        methods: {
            validate()
            {
                const { isRange, currentValue, min, max } = this;

                if (!isRange && currentValue && !(currentValue instanceof Date))
                {
                    $maple.errorLog('DatetimePicker', 'The v-model attr must be a Date Object');
                    this.onError = true;
                }

                if (isRange)
                {
                    if (currentValue && !(currentValue instanceof Array))
                    {
                        $maple.errorLog('DatetimePicker', 'The v-model value must be a Array while in RANGE mode');
                        this.onError = true;
                    }
                    else if ((currentValue[0] && !(currentValue[0] instanceof Date)) || (currentValue[1] && !(currentValue[1] instanceof Date)))
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
            showPopout()
            {
                this.popoutShow = !this.popoutShow;
            },
            hidePopout()
            {
                this.popoutShow = false;
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