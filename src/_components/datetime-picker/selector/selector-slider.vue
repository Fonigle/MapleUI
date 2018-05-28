<template>
    <div :class="['mp-dtp-selector-slider','swiper-no-swiping',{'mp-dtp-selector-slider-width':isWidth}]">
        <div ref="mySwiper" class="mp-dtp-selector-numbers-container swiper-container">
            <div class="swiper-wrapper">
                <div class="mp-dtp-selector-number swiper-slide" v-for="item in list" :key="item" :data-value="item" v-theme:color="2">{{calcText(item)}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper/dist/js/swiper.js';
    import 'swiper/dist/css/swiper.css';
    import TwoWay from 'two-way';

    const vcomp = {
        mixins: [TwoWay],
        props: ['list', 'month', 'width'],
        data()
        {
            const _this = this;

            return {
                mySwiper: null,
            };
        },
        computed: {
            isMonth()
            {
                return (this.month || this.month === '');
            },
            isWidth()
            {
                return (this.width || this.width === '');
            }
        },
        methods: {
            adjustSwiper()
            {
                const currentValue = parseInt(this.currentValue);
                const list = this.list;
                const mySwiper = this.mySwiper;

                mySwiper && mySwiper.update(true);

                if (list.indexOf(currentValue) >= 0)
                {
                    const mySwiper = this.mySwiper;
                    const expactedIndex = list.indexOf(currentValue);

                    const actualIndex = mySwiper.activeIndex;

                    (expactedIndex != actualIndex) && mySwiper.slideTo(expactedIndex);
                }
                else
                {
                    if (this.mySwiper)
                    {
                        const activeIndex = this.mySwiper.activeIndex;
                        const length = list.length;

                        const idx = activeIndex <= length - 1 ? activeIndex : length - 1;
                        this.currentValue = list[idx];
                    }
                }
            },
            handleSlideChange()
            {
                const _this = this;

                const mySwiper = _this.mySwiper;
                _this.currentValue = mySwiper.slides[mySwiper.activeIndex].dataset.value;
            },
            calcText(item)
            {
                let result = this.isMonth ? item + 1 : item;

                result < 10 && (result = `0${result}`);

                return result;
            },
            activeSwiper()
            {
                const _this = this;
                this.mySwiper = new Swiper(this.$refs.mySwiper, {
                    direction: 'vertical',
                    freeMode: true,
                    freeModeSticky: true,
                    freeModeMomentumRatio: 0.5,
                    shortSwipes: false,
                    slidesPerView: 5,
                    centeredSlides: true,
                    speed: 100,
                    noSwipingClass: 'stop-swiping',
                    mousewheel: {
                        sensitivity: 0.32,
                    },
                    runCallbacksOnInit: false,
                    //on: {
                    //    slideChange: window.$maple.debounce(_this.handleSlideChange, 150)
                    //}
                    on: {
                        slideChange: _this.handleSlideChange
                    }
                });
            }
        },
        mounted()
        {
            this.$nextTick(() =>
            {
                this.activeSwiper();
                this.adjustSwiper();
            })
        },
        watch: {
            currentValue(val, oldVal)
            {
                if (val != oldVal)
                {
                    this.$nextTick(() =>
                    {
                        this.adjustSwiper();
                    });
                }
            },
            list(val, oldVal)
            {
                if ($maple.parseString(val) != $maple.parseString(oldVal))
                {
                    this.$nextTick(() =>
                    {
                        this.adjustSwiper();
                    });
                }
            }
        },
        updated()
        {

        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./selector-slider.scss" scoped></style>