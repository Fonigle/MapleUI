<template>
    <frame-choices type="toggle" v-model="currentValue" :reverse-color="reverseColor">
        <slot></slot>
    </frame-choices>
</template>
<script>
    import FrameChoices from '../@choices/choices.vue';
    import TwoWay from '../../_mixins/two-way/two-way';

    const vcomp = {
        mixins: [TwoWay],
        props: ['reverse-color'],
        components: {
            FrameChoices
        }
    }

    export default vcomp;
</script>