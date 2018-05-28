<template>
    <div class="mp-dtp-selector">
        <selector-slider :list="yearList" v-model="year" width></selector-slider>
        <span v-if="isMonthShown" v-theme:color="2">/</span>
        <selector-slider v-if="isMonthShown" :list="monthList" v-model="month" month></selector-slider>
        <span v-if="isDateShown" v-theme:color="2">/</span>
        <selector-slider v-if="isDateShown" :list="dateList" v-model="date"></selector-slider>
        <span v-if="isHourShown">　　</span>
        <selector-slider v-if="isHourShown" :list="hourList" v-model="hour"></selector-slider>
        <span v-if="isMinuteShown" v-theme:color="2">:</span>
        <selector-slider v-if="isMinuteShown" :list="minuteList" v-model="minute"></selector-slider>
        <span v-theme:color="2" v-if="isSecondShown">:</span>
        <selector-slider v-if="isSecondShown" :list="secondList" v-model="second"></selector-slider>
    </div>
</template>
<script>
    import TwoWay from '../../_mixins/two-way/two-way';
    import selectorSlider from './dtp-selector-slider.vue';
    import moment from 'moment';

    const vcomp = {
        mixins: [TwoWay],
        props: ['format'],
        data()
        {
            return {
                formatedMoment: '',
                year: 0,
                month: 1,
                date: 1,
                hour: 0,
                minute: 0,
                second: 0
            };
        },
        computed: {
            isMonthShown()
            {
                return /MM/.test(this.format);
            },
            isDateShown()
            {
                return this.isMonthShown && (/DD/.test(this.format));
            },
            isHourShown()
            {
                return this.isMonthShown && (/HH/.test(this.format));
            },
            isMinuteShown()
            {
                return this.isHourShown && (/mm/.test(this.format));
            },
            isSecondShown()
            {
                return this.isMinuteShown && (/ss/.test(this.format));
            },
            yearList()
            {
                const result = [];
                for (let i = 1970; i <= 2020; i++)
                {
                    result.push(i)
                };
                return result;
            },
            monthList()
            {
                const result = [];

                for (let i = 0; i <= 11; i++)
                {
                    result.push(i)
                };
                return result;
            },
            dateList()
            {
                const result = [];
                const year = this.year;
                const month = this.month;

                const maxDate = (new Date(year, month + 1, 0).getDate()) || 30;

                for (let i = 1; i <= maxDate; i++)
                {
                    result.push(i)
                };
                return result;
            },
            hourList()
            {
                const result = [];
                for (let i = 0; i <= 23; i++)
                {
                    result.push(i)
                };
                return result;
            },
            minuteList()
            {
                const result = [];
                for (let i = 0; i <= 59; i++)
                {
                    result.push(i)
                };
                return result;
            },
            secondList()
            {
                const result = [];
                for (let i = 0; i <= 59; i++)
                {
                    result.push(i)
                };
                return result;
            },
        },
        components: {
            selectorSlider
        },
        methods: {
            calcData()
            {
                let currentValue = this.currentValue;

                this.year = currentValue.year();
                this.month = currentValue.month();
                this.date = currentValue.date();

                this.hour = currentValue.hour();
                this.minute = currentValue.minute();
                this.second = currentValue.second();
            },
            calcFormatedMoment()
            {
                this.formatedMoment = this.currentValue.format('YYYY/MM/DD HH:mm:ss');
            }
        },
        mounted()
        {
            this.calcData();
        },
        watch: {
            currentValue()
            {
                this.calcData();
            },
            formatedMoment()
            {
                this.$emit('change');
            },
            year()
            {
                this.currentValue.year(this.year);
                setTimeout(() => { this.calcFormatedMoment(); }, 0)
            },
            month()
            {
                this.currentValue.month(this.month);
                setTimeout(() => { this.calcFormatedMoment(); }, 0)
            },
            date()
            {
                this.currentValue.date(this.date);
                setTimeout(() => { this.calcFormatedMoment(); }, 0)
            },
            hour()
            {
                this.currentValue.hour(this.hour);
                setTimeout(() => { this.calcFormatedMoment(); }, 0)
            },
            minute()
            {
                this.currentValue.minute(this.minute);
                setTimeout(() => { this.calcFormatedMoment(); }, 0)
            },
            second()
            {
                this.currentValue.second(this.second);
                setTimeout(() => { this.calcFormatedMoment(); }, 0)
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./dtp-selector.scss" scoped></style>