<template>
    <frame-choices type="checkbox" v-model="currentValue" :name="name" :reverse-color="reverseColor" :value="value" :class="{'mp-choices-float':isFloat}">
        <slot></slot>
    </frame-choices>
</template>
<script>
    import FrameChoices from '../@choices/choices.vue';
    import TwoWay from '../../_mixins/two-way/two-way';

    const vcomp = {
        mixins: [TwoWay],
        props: ['name', 'reverse-color', 'float', 'value'],
        computed: {
            isFloat()
            {
                if (this.float || this.float === '')
                {
                    return true;
                }
                return false;
            }
        },
        components: {
            FrameChoices
        }
    }

    export default vcomp;
</script>