<template>
    <frame-choices type="radio" v-model="currentValue" :reverse-color="reverseColor" :name="name" :value="value" :class="{'mp-choices-float':isFloat}" :disabled="disabled">
        <slot></slot>
    </frame-choices>
</template>
<script>
    import FrameChoices from '../@choices/choices.vue';
    import TwoWay from '../../_mixins/two-way/two-way';

    const vcomp = {
        mixins: [TwoWay],
        props: ['name', 'reverse-color', 'value', 'float', 'disabled'],
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