﻿<!--funcitonal-->
<script>
    import TwoWay from '../../_mixins/two-way/two-way';

    const vcomp = {
        identifier: 'mpCheckboxGroup',
        render(h)
        {
            const slots = this.$slots.default || [];
            const selectedSlots = [];

            for (let item of slots)
            {
                if ((((item.componentOptions || {}).Ctor || {}).options || {}).identifier === 'mpCheckboxItem')
                {
                    selectedSlots.push(item);
                }
            }

            return h('div', { class: 'mp-checkbox-group' }, selectedSlots);
        },
        mixins: [TwoWay],
        props: ['name', 'square'],
        data()
        {
            return {
                styles: []
            };
        },
        computed: {
            isSquare()
            {
                if (!this.square || this.square === '') return true;
                else false;
            },
            computedStyle()
            {
                const styles = this.styles;

                let maxWidth = 0;
                let maxHeight = 0;

                for (let item of Object.values(styles))
                {
                    item.width > maxWidth && (maxWidth = item.width);
                    item.height > maxHeight && (maxHeight = item.height);
                }
                return `width:${maxWidth + 48}px;height:${maxHeight + 32}px`;
            }
        },
        methods: {
            setStyles(uid, width, height)
            {
                const filtered = this.styles.filter(item => item.uid === uid);

                if (filtered.length)
                {
                    filtered[0].width = width;
                    filtered[0].height = height;
                }
                else
                {
                    this.styles.push({ uid, width, height });
                }
            }
        },

    }

    export default vcomp;
</script>
<style lang="scss" src="./checkbox-group.scss" scoped></style>