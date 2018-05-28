import './ripple.scss';

function getOffset(curEle)
{
    let totalLeft = null, totalTop = null, par = curEle.offsetParent;
    //���ȼ��Լ��������ƫ�ƺ���ƫ��
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop
    //ֻҪû���ҵ�body�����ǾͰѸ���������ı߿��ƫ��Ҳ�����ۼ�
    while (par)
    {
        //�ۼӸ��������ﱾ���ƫ��
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