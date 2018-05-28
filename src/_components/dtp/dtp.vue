<template>
    <div class="mp-dtp" v-click-outside="outsideClick">
        <maple-input v-if="!isRange" v-model="currentValue" @click="inputClick()" readonly :centered="centered"><slot></slot></maple-input>
        <transition name="mp-slide-down">
            <div v-if="!isRange && popoutShow" class="mp-dtp-popout" v-theme:background v-theme:level="3">
                <dtp-selector v-model="momentValue" @change="handleValueChange" :format="format"></dtp-selector>
            </div>
        </transition>
        <maple-input v-if="isRange" v-model="currentValue" @click="inputClick()" readonly :centered="centered"><slot></slot></maple-input>
        <transition name="mp-slide-down">
            <div v-if="!isRange && popoutShow" class="mp-dtp-popout" v-theme:background v-theme:level="3">
                <dtp-selector v-model="momentValue" @change="handleValueChange" :format="format"></dtp-selector>
            </div>
        </transition>
    </div>
</template>
<script>
    import TwoWay from '../../_mixins/two-way/two-way';
    import mapleInput from '../input/input.vue';
    import dtpSelector from './dtp-selector.vue';
    import moment from 'moment';

    const vcomp = {
        mixins: [TwoWay],
        data()
        {
            return {
                popoutShow: false,
                momentValue: null
            };
        },
        props: {
            range: {},
            centered: {},
            format: {
                default: 'YYYY/MM/DD HH:mm:ss'
            }
        },
        computed: {
            slotContent()
            {
                return this.$slots.default;
            },
            isRange()
            {
                if (this.range || this.range === '') return true;
                else return false;
            }
        },
        components: {
            mapleInput,
            dtpSelector
        },
        methods: {
            inputClick()
            {
                this.popoutShow = true;
            },
            outsideClick()
            {
                this.popoutShow = false;
            },
            calcMomentValue()
            {
                this.momentValue = moment(new Date(this.currentValue));
            },
            handleValueChange(value)
            {
                this.currentValue = this.momentValue.format(this.format);
            }
        },
        mounted()
        {
            this.calcMomentValue();
            this.currentValue = this.momentValue.format(this.format);
        },
        watch: {
            currentValue()
            {
                this.calcMomentValue();
                this.currentValue = this.momentValue.format(this.format);
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./dtp.scss" scoped></style>