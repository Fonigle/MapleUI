import './theme.scss';

const Theme = (el, binding) =>
{
    const arg = binding.arg;
    const value = binding.value;
    const modifiers = binding.modifiers;

    switch (arg)
    {
        case 'color': {
            let color = '';
            (value === 0 || value === 'white') && (color = 'white');
            (value === 1 || value === 'primary' || value === undefined) && (color = 'primary');
            (value === 2 || value === 'secondary') && (color = 'secondary');
            (value === 3 || value === 'thirdly') && (color = 'thirdly');

            (value === 10 || value === 'main-pale') && (color = 'main-pale');
            (value === 11 || value === 'main') && (color = 'main');
            (value === 12 || value === 'main-deep') && (color = 'main-deep');

            (value === 20 || value === 'accent-pale') && (color = 'accent-pale');
            (value === 21 || value === 'accent') && (color = 'accent');
            (value === 22 || value === 'accent-deep') && (color = 'accent-deep');

            (value === 200 || value === 'success') && (color = 'success');
            (value === 300 || value === 'warn') && (color = 'warn');
            (value === 400 || value === 'error') && (color = 'error');

            let modifier = '';
            (Object.keys(modifiers).indexOf('hover') >= 0) && (modifier = 'hover-');

            el.classList.add(`mp-theme-${modifier}color-${color}`);
            break;
        };
        case 'divide': {
            let positionList = [];
            if (Object.keys(modifiers).indexOf('all') >= 0)
            {
                positionList.push('all');
            }
            else
            {
                //根据mod写入边框位置
                let positionFlag = false;
                for (let item of ['top', 'right', 'bottom', 'left'])
                {
                    if (Object.keys(modifiers).indexOf(item) >= 0)
                    {
                        positionList.push(item);
                        positionFlag = true;
                    }
                }
                //若mod中未标记位置，则默认为下边框
                !positionFlag && positionList.push('bottom');
            }

            let notLast = '';
            Object.keys(modifiers).indexOf('not-last') >= 0 && (notLast = '-not-last');

            let borderType = '';
            (value === 1 || value === 'solid' || value === undefined) && (borderType = 'solid');
            (value === 2 || value === 'dashed') && (borderType = 'dashed');
            (value === 3 || value === 'dotted') && (borderType = 'dotted');

            for (let item of positionList)
            {
                el.classList.add(`mp-theme-divide-${item}-${borderType}${notLast}`);
            };
            break;
        };
        case 'background': {
            let backgroundColor = '';
            (value === -1 || value === 'floor') && (backgroundColor = 'floor');
            (value === 0 || value === 'panel') && (backgroundColor = 'panel');
            (value === 1 || value === 'component' || value === undefined) && (backgroundColor = 'component');

            (value === 10 || value === 'main-pale') && (backgroundColor = 'main-pale');
            (value === 11 || value === 'main') && (backgroundColor = 'main');
            (value === 12 || value === 'main-deep') && (backgroundColor = 'main-deep');

            (value === 20 || value === 'accent-pale') && (backgroundColor = 'accent-pale');
            (value === 21 || value === 'accent') && (backgroundColor = 'accent');
            (value === 22 || value === 'accent-deep') && (backgroundColor = 'accent-deep');

            (value === 30 || value === 'selected-pale') && (backgroundColor = 'selected-pale');
            (value === 31 || value === 'selected') && (backgroundColor = 'selected');

            (value === 40 || value === 'cloak') && (backgroundColor = 'cloak');

            (value === 200 || value === 'success') && (backgroundColor = 'success');
            (value === 300 || value === 'warn') && (backgroundColor = 'warn');
            (value === 400 || value === 'error') && (backgroundColor = 'error');


            let active = '';
            Object.keys(modifiers).indexOf('active') >= 0 && (active = '-active');

            let hover = '';
            Object.keys(modifiers).indexOf('hover') >= 0 && (hover = '-hover');


            el.classList.add(`mp-theme${active}${hover}-background-${backgroundColor}`);
            break;
        };
        case 'level': {
            let level = 0;
            for (let item of [1, 2, 3, 4, 5])
            {
                value === item && (level = value);
            }
            if (value === undefined)
            {
                level = 1;
            }


            let hover = '';
            Object.keys(modifiers).indexOf('hover') >= 0 && (hover = '-hover');

            level && el.classList.add(`mp-theme${hover}-level-${level}`);
            break;
        };
        default: break;
    }
}

export default Theme