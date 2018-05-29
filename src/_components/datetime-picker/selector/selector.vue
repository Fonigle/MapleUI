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
                const max = this.max ? this.max.getFullYear() : 2050;
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
                const { min, max, year, month, date } = this;
                let minValue = 0, maxValue = 23;

                if (min)
                {
                    const minYear = min.getFullYear();
                    const minMonth = min.getMonth();
                    const minDate = min.getDate();

                    if (year == minYear && month == minMonth && date == minDate)
                    {
                        minValue = min.getHours();
                    }
                }

                if (max)
                {
                    const maxYear = max.getFullYear();
                    const maxMonth = max.getMonth();
                    const maxDate = max.getDate();

                    if (year == maxYear && month == maxMonth && date == maxDate)
                    {
                        maxValue = max.getHours();
                    }
                }
                for (let i = minValue; i <= maxValue; i++)
                {
                    result.push(i)
                };
                return result;
            },
            minuteList()
            {
                const result = [];
                const { min, max, year, month, date, hour } = this;
                let minValue = 0, maxValue = 59;

                if (min)
                {
                    const minYear = min.getFullYear();
                    const minMonth = min.getMonth();
                    const minDate = min.getDate();
                    const minHour = min.getHours();

                    if (year == minYear && month == minMonth && date == minDate & hour == minHour)
                    {
                        minValue = min.getMinutes();
                    }
                }

                if (max)
                {
                    const maxYear = max.getFullYear();
                    const maxMonth = max.getMonth();
                    const maxDate = max.getDate();
                    const maxHour = max.getHours();


                    if (year == maxYear && month == maxMonth && date == maxDate && hour == maxHour)
                    {
                        maxValue = max.getMinutes();
                    }
                }

                for (let i = minValue; i <= maxValue; i++)
                {
                    result.push(i)
                };
                return result;
            },
            secondList()
            {
                const result = [];
                const { min, max, year, month, date, hour, minute } = this;
                let minValue = 0, maxValue = 59;

                if (min)
                {
                    const minYear = min.getFullYear();
                    const minMonth = min.getMonth();
                    const minDate = min.getDate();
                    const minHour = min.getHours();
                    const minMinute = min.getMinutes();

                    if (year == minYear && month == minMonth && date == minDate && hour == minHour && minute == minMinute)
                    {
                        minValue = min.getSeconds();
                    }
                }

                if (max)
                {
                    const maxYear = max.getFullYear();
                    const maxMonth = max.getMonth();
                    const maxDate = max.getDate();
                    const maxHour = max.getHours();
                    const maxMinute = max.getMinutes();

                    if (year == maxYear && month == maxMonth && date == maxDate && hour == maxHour && minute == maxMinute)
                    {

                        maxValue = max.getSeconds();
                    }
                }

                for (let i = minValue; i <= maxValue; i++)
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

                if (this.checkDate(timeString) && this.ValidateMin(this.currentTime) && this.ValidateMax(this.currentTime))
                {
                    this.currentValue = this.currentTime.getTime();
                }
            },
            checkDate(date)
            {
                const m = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
                if (m == null)
                    return false;
                let d = new Date(m[1], m[3] - 1, m[4]);
                return (d.getFullYear() == m[1] && (d.getMonth() + 1) == m[3] && d.getDate() == m[4]);
            },
            ValidateMin(time)
            {
                const { min } = this;
                if (min)
                {
                    if (time >= min.getTime()) return true;
                    else return false;
                }
                else
                {
                    return true;
                }
            },
            ValidateMax(time)
            {
                const { max } = this;
                if (max)
                {
                    if (time <= max.getTime()) return true;
                    else return false;
                }
                else
                {
                    return true;
                }
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
            },
            currentValue()
            {
                this.calcData();
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./selector.scss" scoped></style>