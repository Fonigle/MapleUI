const handleStyleChange = (el, sequence, top) =>
{
    //取断点
    let breakpoints = [];
    let first = sequence[Object.keys(sequence)[0]] || {};
    breakpoints = Object.keys(first.values || {});

    let maxBreakpoint = breakpoints[breakpoints.length - 1]

    let prevBreakpoint, nextBreakpoint;

    let temp = [...breakpoints];
    let reserved = temp.reverse();

    prevBreakpoint = reserved.find(element => element <= top);
    nextBreakpoint = breakpoints.find(element => element > top);

    for (let item of Object.keys(sequence))
    {
        const values = sequence[item].values;
        const unit = sequence[item].unit;
        if (top < maxBreakpoint)
        {
            let prevValue, nextValue;


            prevValue = values[prevBreakpoint];
            nextValue = values[nextBreakpoint];

            let differenceValue = prevValue - nextValue;
            let differenceBreakpoint = prevBreakpoint - nextBreakpoint;



            let deltaPercent = (top - prevBreakpoint) / differenceBreakpoint;
            let deltaValue = deltaPercent * differenceValue;

            let nowValue = prevValue + deltaValue;

            el.style[item] = `${nowValue}${unit}`;
        }
        else
        {
            el.style[item] = `${values[maxBreakpoint]}${unit}`;
        }
    }
}


const handleScrollEvent = event =>
{
    const scroller = event.target;
    const top = scroller.scrollTop;

    const data = scroller.$parallax;


    for (let item of data)
    {
        const el = item.el;
        const sequence = item.sequence;
        handleStyleChange(el, sequence, top);
    }
}

const getInitParent = (el, group) =>
{
    let elParent = null;
    let elTemp = el;
    while (!elParent)
    {
        if (elTemp.parentNode.classList.contains(`mp-parallax-${group}-init`) || elTemp.parentNode.tagName === 'BODY') elParent = elTemp.parentNode;
        else elTemp = elTemp.parentNode;
    }

    return elParent;
}


const toCamelCase = str =>
{
    let result = '';
    let arr = str.split('-');

    let i = 0;
    for (let item of arr)
    {
        const temp = item;
        //temp = temp.toLowerCase();
        if (i > 0)
        {
            temp = temp.replace(/\b\w+\b/g, word =>
            {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            })
        }
        result += temp;
        i++;
    }
    return result;
}

const getNumber = str =>
{
    str = str || '';
    let temp = str.toString();
    let arr = temp.match(/\d+/g) || [];

    return parseInt(arr[0] || 0);
}

const getUnit = str =>
{
    str = str || '';
    let temp = str.toString()
    let result = temp.replace(/\d+/g, '')

    return result;
}


const computeFinelUnit = (attribute, unitList) =>
{
    const acceptUnit = {
        height: ['px', '%'],
        width: ['px', '%'],
        fontSize: ['px'],
        lineHeight: ['px'],
        opacity: [''],
        left: ['px', '%'],
        right: ['px', '%'],
        top: ['px', '%'],
        bottom: ['px', '%'],
        paddingTop: ['px']
    }

    let result = acceptUnit[attribute][0];

    for (let item of acceptUnit[attribute])
    {
        if (unitList.indexOf(item) >= 0)
        {
            result = item;
            break;
        }

    }

    return result;
}

const computeSeqence = options =>
{

    /*-断点-*/
    let breakpoints = Object.keys(options);
    breakpoints = [...new Set([...breakpoints, 0])]; //补0
    breakpoints = breakpoints.map(value => parseInt(value)); //转数字
    breakpoints.sort(); //排序

    /*-属性-*/
    let attributes = [];
    for (let item of Object.values(options))
    {
        attributes = [...attributes, ...Object.keys(item)]; //依次合并
    }
    attributes = [...new Set(attributes)].sort(); //去重

    const acceptAttributes = ['height', 'width', 'left', 'top', 'bottom', 'right', 'fontSize', 'lineHeight', 'paddingTop', 'opacity'];


    attributes = attributes.filter(element => acceptAttributes.indexOf(element) >= 0); //过滤属性

    let sequence = {};
    for (let attribute of attributes)
    {
        const camelAttribute = toCamelCase(attribute);
        sequence[camelAttribute] = {};


        let unitList = [];
        let values = {};

        let temp = 0;
        for (let breakpoint of breakpoints)
        {
            const val = (options[breakpoint] || {})[attribute];


            unitList.push(getUnit(val));
            const num = getNumber(val);

            //不能使用逻辑运算符||简写，val的值可能为0
            values[breakpoint] = num === undefined ? temp : num;
            temp = values[breakpoint];
        }

        sequence[camelAttribute].values = values;
        sequence[camelAttribute].unit = computeFinelUnit(camelAttribute, unitList);
    }

    return sequence;
}

const initParallax = (el, binding, vnode) =>
{
    const arg = binding.arg;
    const value = binding.value;
    const modifiers = binding.modifiers;

    if (!vnode.$parallax) vnode.$parallax = {};

    const group = Object.keys(modifiers)[0] || 'default';

    if (arg === 'init')
    {
        el.classList.add(`mp-parallax-${group}-init`);

        el.$parallax = [];

        el.addEventListener('scroll', event => handleScrollEvent(event));
    }
}

const updateParallax = (el, binding, vnode, oldVnode) =>
{
    const arg = binding.arg;
    const value = binding.value;
    const modifiers = binding.modifiers;

    const group = Object.keys(modifiers)[0] || 'default';

    if (arg !== 'init')
    {

        const breakpoint = parseInt(arg);

        //若不为update，则更新自身属性
        vnode.$parallax = oldVnode ? oldVnode.$parallax : vnode.$parallax;

        if (isNaN(breakpoint))
        {
            return false;
        }
        else
        {
            if (!vnode.$parallax[group]) vnode.$parallax[group] = {};
            vnode.$parallax[group][breakpoint] = value;
        }


        const options = vnode.$parallax[group] || {};
        const sequence = computeSeqence(options);

        const elParent = getInitParent(el, group);
        const data = elParent.$parallax;

        if (!(data.filter(element => element.el === el)).length)
            data.push({
                el,
                sequence: {}
            });
        data.filter(element => element.el === el)[0].sequence = sequence;
    };
}

const Parallax = {
    bind(el, binding, vnode)
    {
        initParallax(el, binding, vnode);
    },
    inserted(el, binding, vnode)
    {
        updateParallax(el, binding, vnode);
    },
    update(el, binding, vnode, oldVnode)
    {
        updateParallax(el, binding, vnode, oldVnode);
    }
}


export default Parallax;
