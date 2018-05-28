<template>
    <div class="mp-drawer-item" v-theme:background v-theme:divide v-theme:level>
        <div ref="label" class="label" @click="labelClick()">
            <div class="label-content">
                <slot></slot>
            </div>
            <div class="arrow" v-theme:color="3" v-theme:color.hover="200">
                <i class="mdi mdi-chevron-down" v-if="computedType==='stretch'" :class="{active:stretched}"></i>
                <i class="mdi mdi-menu-right" v-else-if="computedType==='expand'"></i>
            </div>
        </div>
        <div ref="stretchContent" v-if="computedType==='stretch'" class="mp-drawer-stretch">
            <div class="mp-drawer-stretch-content">
                <slot name="content"></slot>
            </div>
        </div>
        <div ref="expandContent" v-else-if="computedType==='expand'" class="mp-drawer-expand" v-theme:background>
            <div class="mp-drawer-expand-header">
                <div class="btn">
                    <mp-btn-icon v-theme:color="2" @click="backClick">
                        <i class="mdi mdi-arrow-left"></i>
                    </mp-btn-icon>
                </div>
                <div class="name">{{name}}</div>
            </div>
            <div class="mp-drawer-expand-content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    const vcomp = {
        data()
        {
            return {
                stretched: false,
            };
        },
        props: {
            type: {
                type: String,
                default: 'expand',
                validator(value)
                {
                    //return value === 'expand';
                    if (value === 'expand' || value === 'stretch' || value === 1 || value || 2)
                    {
                        return true;
                    }
                    else
                    {
                        errorLog('DrawerItem', 'prop "type" must be one of the list below:\n["expand", "stretch"]');
                        return false;
                    }

                }
            },
            name: null
        },
        computed: {
            computedType()
            {
                const type = this.type;
                if (!type || type === 1 || type === 'expand')
                {
                    return 'expand';
                }
                else if (type == 2 || type === 'stretch')
                {
                    return 'stretch';
                }
                else
                {
                    return false;
                }

            }
        },
        methods: {
            labelClick()
            {
                switch (this.computedType)
                {
                    case 'expand': {
                        const _this = this;
                        const ele_expandContent = this.$refs.expandContent;
                        const ele_label = this.$refs.label;

                        setTimeout(() =>
                        {
                            const labelHeight = ele_label.offsetHeight;
                            ele_expandContent.style.height = `${labelHeight}px`;
                            const top = ele_label.offsetTop;
                            ele_expandContent.style.top = `${top}px`;
                            ele_expandContent.style.width = '100%';
                            ele_expandContent.classList.add('mp-theme-level-2');

                            ele_expandContent.classList.add('expanded');
                        }, 0)

                        setTimeout(() =>
                        {
                            ele_expandContent.classList.add('expanding');
                            const eleDrawer = ele_label.parentsElementByClass('mp-drawer');
                            const height = eleDrawer.offsetHeight;

                            ele_expandContent.style.height = `${height}px`;
                            ele_expandContent.style.top = 0;
                        }, 300)

                        break;
                    };
                    case 'stretch': {

                        if (this.stretched)
                        {
                            this.stretched = false;
                            this.$refs.stretchContent.style.height = `0`;
                        }
                        else
                        {
                            this.stretched = true;
                            const eleSlot = this.$refs.stretchContent.children[0];
                            const height = eleSlot.offsetHeight;

                            this.$refs.stretchContent.style.height = `${height}px`;
                        };
                        break;
                    };
                    default: break;
                }
            },
            backClick()
            {
                const _this = this;
                const ele_expandContent = this.$refs.expandContent;
                const ele_label = this.$refs.label;

                setTimeout(() =>
                {
                    const labelHeight = ele_label.offsetHeight;
                    ele_expandContent.style.height = `${labelHeight}px`;
                    const top = ele_label.offsetTop;
                    ele_expandContent.style.top = `${top}px`;
                    ele_expandContent.classList.remove('expanded');

                }, 0)

                setTimeout(() =>
                {
                    ele_expandContent.classList.remove('expanding');
                    ele_expandContent.style.width = 0;

                }, 400)

                setTimeout(() =>
                {
                    ele_expandContent.classList.remove('mp-theme-level-2');
                }, 540)

            }
        },
        mounted()
        {
        }
    }

    export default vcomp;
</script>
<style lang="scss" src="./drawer-item.scss" scoped></style>