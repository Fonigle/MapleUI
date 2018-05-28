<template>
    <div class="mp-tabs">
        <tabs-selectors :contents="contents" :active="active" @change="changeActive"></tabs-selectors>
        <div class="mp-tabs-contents">
            <div class="mp-tabs-content-wrapper" :style="contentWrapperStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import TabsSelectors from './tabs-selectors.vue';

    const vcomp = {
        data()
        {
            return {
                contents: [],
                active: 0
            };
        },
        computed: {
            contentWrapperStyle()
            {
                return `width:${(this.contents.length * 100) || 0}%;transform:translateX(${-1 * ((this.active / this.contents.length * 100) || 0)}%);`
            }
        },
        components: {
            TabsSelectors
        },
        methods: {
            addContent(item)
            {
                const index = this.$slots.default.filter(item =>
                {
                    return item.elm.nodeType === 1 && /\bmp-tabs-content\b/.test(item.elm.className);
                }).indexOf(item.$vnode);
                this.contents.splice(index, 0, item);
            },
            changeActive(index)
            {
                this.active = index;
            },
            slideTo(arg)
            {
                if (!isNaN(arg) && arg < this.contents.length)
                {
                    this.active = arg;
                }
            }
        },
        mounted()
        {
            function A(number)
            {
                if (number < 1)
                {
                    return 1
                } else
                {
                    return number * arguments.callee(number - 1);
                }

            }
        },
        watch: {
            contents()
            {
                for (let item of this.contents)
                {
                    item.$el.style.width = `${1 / this.contents.length * 100}%`;
                }
            }
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./tabs.scss" scoped></style>