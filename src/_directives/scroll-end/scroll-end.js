const scrollEndContext = '@@scrollEndContext';


export default {
    /*
     @param el 指令所绑定的元素
     @param binding {Object} 
     @param vnode vue编译生成的虚拟节点
     */
    bind(el, binding, vnode)
    {
        const scrollerHandler = function (e)
        {
            if (!vnode.context)
            {
                return false;
            }

            if (el.scrollHeight - el.scrollTop === el.clientHeight)
            {
                if (binding.expression)
                {
                    vnode.context[el[scrollEndContext].methodName](e)
                } else
                {
                    el[scrollEndContext].bindingFn(e);
                }
            }
        }

        el[scrollEndContext] = {
            scrollerHandler,
            methodName: binding.expression,
            bindingFn: binding.value
        }

        setTimeout(() =>
        {
            el.addEventListener('scroll', scrollerHandler);
        }, 0)

    },
    update(el, binding)
    {
        //el[clickoutsideContext].methodName = binding.expression;
        //el[clickoutsideContext].bindingFn = binding.value;
    },
    unbind(el)
    {
        //document.removeEventListener('click', el[clickoutsideContext].documentHandler);
    }
}