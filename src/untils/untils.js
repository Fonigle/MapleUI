HTMLElement.prototype.parentsElementByClass = function (className)
{
    let eleResult = null;
    let eleTemp = this;
    while (!eleResult)
    {
        const eleParent = eleTemp.parentNode;
        (eleParent.classList.value.split(' ').indexOf(className) >= 0 || eleParent.tagName.toLowerCase() === 'body') ? (eleResult = eleParent) : (eleTemp = eleParent);
    }

    return eleResult;
};

function clone(obj)
{
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Date)
    {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array)
    {
        var len = obj.length
        var copy = [];
        for (var i = 0; i < len; ++i)
        {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object)
    {
        var copy = {};
        for (var attr in obj)
        {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy this obj");
}

const styles = {
    mapleStyle: 'background:#4527A0;color:#fff;border-radius:5px 0 0 5px;',
    componentStyle: 'background:#1976D2;color:#fff;',
    errorTipStyle: 'background:#F44336;color:#fff;border-radius:0 5px 5px 0;',
    errorTextStyle: 'color:#F44336',
}


window.$maple = {
    debounce(fn, delay)
    {
        let timer = null;
        return function ()
        {
            let context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function ()
            {
                fn.apply(context, args);
            }, delay);
        };
    },
    throttle(fn, threshhold, scope)
    {
        threshhold || (threshhold = 250);
        let last,
            deferTimer;
        return function ()
        {
            let context = scope || this;

            let now = +new Date,
                args = arguments;
            if (last && now < last + threshhold)
            {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function ()
                {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else
            {
                last = now;
                fn.apply(context, args);
            }
        }
    },
    deepClone: clone,
    errorLog: (componentName, text) =>
    {
        console.log(`%c MapleUI %c ${componentName} %c error \n%c${text}`, styles.mapleStyle, styles.componentStyle, styles.errorTipStyle, styles.errorTextStyle);
    },
    singleDirectiveProp: prop =>
    {
        if (prop || prop === '') return true;
        else return false;
    },
    dateFormat: (date, format) =>
    {
        if (!(date instanceof Date))
        {
            return 'invalid Date';
        }
        else
        {
            const o = {
                "M+": date.getMonth() + 1,                 //月份 
                "D+": date.getDate(),
                "d+": date.getDate(),                    //日 
                "H+": date.getHours(),
                "h+": date.getHours(),                   //小时 
                "m+": date.getMinutes(),                 //分 
                "s+": date.getSeconds(),                 //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds()             //毫秒 
            };

            if (/(y+)/.test(format))
            {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(Y+)/.test(format))
            {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o)
            {
                if (new RegExp("(" + k + ")").test(format))
                {
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return format;
        }

    },
    parseString: array =>
    {
        let result = '';
        for (let item of array)
        {
            let str = ''
            if (item instanceof Object)
            {
                str = JSON.stringify(item);
            }
            else
            {
                str = item.toString();
            }
            result += str + ',';
        }
        result = result.replace(/,$/, '');

        return `[${result}]`;
    }
}