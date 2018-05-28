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
    import TwoWay from '../../_mixins/two-way/two-way';

    const vcomp = {
        mixins: [TwoWay],
        props: ['list', 'month', 'width'],
        data()
        {
            const _this = this;

            return {
                mySwiper: null,
                swiperOptions: {
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
                    on: {
                        slideChange: window.$maple.debounce(_this.handleSlideChange, 150)
                    }
                }
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
                const currentValue = this.currentValue;
                const list = this.list;

                if (list.indexOf(currentValue) >= 0)
                {
                    const mySwiper = this.mySwiper;
                    const expactedIndex = list.indexOf(currentValue);

                    const actualIndex = mySwiper.activeIndex;

                    (expactedIndex != actualIndex) && mySwiper.slideTo(expactedIndex);
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
                    on: {
                        slideChange: window.$maple.debounce(_this.handleSlideChange, 150)
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
            currentValue()
            {
                this.$nextTick(() =>
                {
                    this.adjustSwiper();
                });
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./dtp-selector-slider.scss" scoped></style>