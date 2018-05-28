import './ripple.scss';

function getOffset(curEle)
{
    let totalLeft = null, totalTop = null, par = curEle.offsetParent;
    //首先加自己本身的左偏移和上偏移
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop
    //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while (par)
    {
        //累加父级参照物本身的偏移
        totalLeft += par.offsetLeft;
        totalTop += par.offsetTop
        par = par.offsetParent;
    }

    return {
        top: totalTop,
        left: totalLeft,
    }
}

export default {
    inserted(el)
    {
        el.classList.add('mp-ripple-container');
        el.addEventListener('mousedown', function (e)
        {
            const offset = getOffset(el);
            const x = e.pageX;
            const y = e.pageY;

            const el_ripple = document.createElement("i");
            el_ripple.classList.add('mp-ripple-waves');
            el_ripple.style.left = `${x - offset.left - 10}px`;
            el_ripple.style.top = `${y - offset.top - 10}px`;

            el.appendChild(el_ripple);

            setTimeout(() =>
            {
                el.removeChild(el_ripple);
            }, 750)
        })
    },
    update(el)
    {
        el.classList.add('mp-ripple-container');
    }
};