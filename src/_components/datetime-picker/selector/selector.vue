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
    import TwoWay from 'two-way';
    import selectorSlider from './selector-slider.vue';
    import moment from 'moment';

    const vcomp = {
        mixins: [TwoWay],
        props: ['format', 'min', 'max'],
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
                const min = this.min ? this.min.getFullYear() : 1970;
                const max = this.min ? this.max.getFullYear() : 2050;
                for (let i = min; i <= max; i++)
                {
                    result.push(i)
                };
                return result;
            },
            monthList()
            {
                const result = [];

                const { min, max, year } = this;

                let minValue = 0, maxValue = 11;
                if (min)
                {
                    const minYear = min.getFullYear();
                    if (year == minYear)
                    {
                        minValue = min.getMonth();
                    }
                }

                if (max)
                {
                    const maxYear = max.getFullYear();
                    if (year == maxYear)
                    {
                        maxValue = max.getMonth();
                    }
                }

                for (let i = minValue; i <= maxValue; i++)
                {
                    result.push(i)
                };
                return result;
            },
            dateList()
            {
                const result = [];
                const { min, max, year } = this;
                const month = parseInt(this.month);

                let minValue = 1, maxValue = new Date(year, month + 1, 0).getDate();

                if (min)
                {
                    const minYear = min.getFullYear();
                    const minMonth = min.getMonth();

                    if (year == minYear && month == minMonth)
                    {
                        minValue = min.getDate();
                    }
                }

                if (max)
                {
                    const maxYear = max.getFullYear();
                    const maxMonth = max.getMonth();

                    if (year == maxYear && month == maxMonth)
                    {
                        maxValue = max.getDate();
                    }
                }

                for (let i = minValue; i <= maxValue; i++)
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
            currentTime: {
                get()
                {
                    return new Date(this.currentValue)
                },
                set(val)
                {
                    this.currentValue = val.getTime();
                }
            }
        },
        components: {
            selectorSlider
        },
        methods: {
            calcData()
            {
                let currentTime = this.currentTime;

                this.year = currentTime.getFullYear();
                this.month = currentTime.getMonth();
                this.date = currentTime.getDate();

                this.hour = currentTime.getHours();
                this.minute = currentTime.getMinutes();
                this.second = currentTime.getSeconds();
            },
            setData()
            {
                const timeString = $maple.dateFormat(this.currentTime, 'YYYY/MM/DD hh:mm:ss');
                if (this.checkDate(timeString));
                {
                    this.currentValue = this.currentTime.getTime();
                }
            },
            checkDate(date)
            {
                const m = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

                if (m == null)
                    return false;
                let d = new Date(m[1], m[3] - 1, m[4]);
                return (d.getFullYear() == m[1] && (d.getMonth() + 1) == m[3] && d.getDate() == m[4]);
            }
        },
        mounted()
        {
            this.calcData();
        },
        watch: {
            year()
            {
                this.currentTime.setYear(this.year);
                this.setData();
            },
            month()
            {
                this.currentTime.setMonth(this.month);
                this.setData();
            },
            date()
            {
                this.currentTime.setDate(this.date);
                this.setData();
            },
            hour()
            {
                this.currentTime.setHours(this.hour);
                this.setData();
            },
            minute()
            {
                this.currentTime.setMinutes(this.minute);
                this.setData();
            },
            second()
            {
                this.currentTime.setSeconds(this.second);
                this.setData();
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./selector.scss" scoped></style>