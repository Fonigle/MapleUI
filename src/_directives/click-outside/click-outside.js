//import Vue from 'vue';

//const nodeList = [];
//const ctx = '@@clickoutsideContext';

//let startClick;
//let seed = 0;


//if (!Vue.prototype.$isServer)
//{
//    document.addEventListener('mousedown', e => (startClick = e));
//    document.addEventListener('mouseup', e =>
//    {
//        nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
//    });
//}

//function createDocumentHandler(el, binding, vnode)
//{
//    return function (mouseup = {}, mousedown = {})
//    {
//        if (!vnode ||
//            !vnode.context ||
//            !mouseup.target ||
//            !mousedown.target ||
//            el.contains(mouseup.target) ||
//            el.contains(mousedown.target) ||
//            el === mouseup.target ||
//            (vnode.context.popperElm &&
//                (vnode.context.popperElm.contains(mouseup.target) ||
//                    vnode.context.popperElm.contains(mousedown.target)))) return;

//        if (binding.expression &&
//            el[ctx].methodName &&
//            vnode.context[el[ctx].methodName])
//        {
//            vnode.context[el[ctx].methodName]();
//        } else
//        {
//            el[ctx].bindingFn && el[ctx].bindingFn();
//        }
//    };
//}

///**
// * v-clickoutside
// * @desc 点击元素外面才会触发的事件
// * @example
// * ```vue
// * <div v-element-clickoutside="handleClose">
// * ```
// */
//export default {
//    bind(el, binding, vnode)
//    {
//        nodeList.push(el);
//        const id = seed++;
//        el[ctx] = {
//            id,
//            documentHandler: createDocumentHandler(el, binding, vnode),
//            methodName: binding.expression,
//            bindingFn: binding.value
//        };
//    },

//    update(el, binding, vnode)
//    {
//        el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
//        el[ctx].methodName = binding.expression;
//        el[ctx].bindingFn = binding.value;
//    },

//    unbind(el)
//    {
//        let len = nodeList.length;

//        for (let i = 0; i < len; i++)
//        {
//            if (nodeList[i][ctx].id === el[ctx].id)
//            {
//                nodeList.splice(i, 1);
//                break;
//            }
//        }
//        delete el[ctx];
//    }
//};
const clickoutsideContext = '@@clickoutsideContext';

export default {
    /*
     @param el 指令所绑定的元素
     @param binding {Object} 
     @param vnode vue编译生成的虚拟节点
     */
    bind(el, binding, vnode)
    {
        const documentHandler = function (e)
        {
            if (!vnode.context || el.contains(e.target))
            {
                return false;
            }
            if (binding.expression)
            {
                vnode.context[el[clickoutsideContext].methodName](e)
            } else
            {
                el[clickoutsideContext].bindingFn(e);
            }
        }
        el[clickoutsideContext] = {
            documentHandler,
            methodName: binding.expression,
            bindingFn: binding.value
        }
        setTimeout(() =>
        {
            document.addEventListener('click', documentHandler);
        }, 0)
    },
    update(el, binding)
    {
        el[clickoutsideContext].methodName = binding.expression;
        el[clickoutsideContext].bindingFn = binding.value;
    },
    unbind(el)
    {
        document.removeEventListener('click', el[clickoutsideContext].documentHandler);
    }
}