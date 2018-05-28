import './index.scss';
import './untils/untils';
import './outputs/outputs';
//mdi-iconfonts
import './iconfonts/mp-icon/mp-icon.scss';

//******Directives
import Theme from './_directives/theme/theme';
import ClickOutside from './_directives/click-outside/click-outside';
import Scroller from './_directives/scroller/scroller';
import Parallax from './_directives/parallax/parallax';
import Z from './_directives/z/z';
import ScrollEnd from './_directives/scroll-end/scroll-end';
import Ripple from './_directives/ripple/ripple';

//****** Components
import { mpDrawer, mpDrawerGroup, mpDrawerItem } from './_components/drawer/drawer';
import { mpBtnIcon } from './_components/btn-icon/btn-icon';
import { mpBtnCircular } from './_components/btn-circular/btn-circular';
import { mpCheckbox } from './_components/checkbox/checkbox';
import { mpToggle } from './_components/toggle/toggle';
import { mpRadio } from './_components/radio/radio';
import { mpInput } from './_components/input/input';
import { mpTabs, mpTabsContent } from './_components/tabs/tabs';
import { mpDtPicker } from './_components/datetime-picker/datetime-picker';
import { mpScroller } from './_components/scroller/scroller';
import { mpRadioGroup, mpRadioItem } from './_components/radio-group/radio-group';
import { mpCheckboxGroup, mpCheckboxItem } from './_components/checkbox-group/checkbox-group';
import { mpTile } from './_components/tile/tile';


//******Styles
import './_transition/transition.scss';



const MapleUI = {
    install(Vue, options)
    {
        //******Directives
        Vue.directive('theme', Theme);
        Vue.directive('click-outside', ClickOutside);
        Vue.directive('scroller', Scroller);
        Vue.directive('parallax', Parallax);
        Vue.directive('z', Z);
        Vue.directive('scroll-end', ScrollEnd);
        Vue.directive('ripple', Ripple);
        //******Components
        //--Drawer
        Vue.component('mp-drawer', mpDrawer);
        Vue.component('mp-drawer-group', mpDrawerGroup);
        Vue.component('mp-drawer-item', mpDrawerItem);
        //--BtnIcon(alias:ButtonIcon)
        Vue.component('mp-btn-icon', mpBtnIcon);
        Vue.component('mp-button-icon', mpBtnIcon);
        //--BtnCircular(alias:ButtonCircular);
        Vue.component('mp-btn-circular', mpBtnCircular);
        Vue.component('mp-button-circular', mpBtnCircular);
        //--Checkbox
        Vue.component('mp-checkbox', mpCheckbox);
        //--Toggle
        Vue.component('mp-toggle', mpToggle);
        //--Radio
        Vue.component('mp-radio', mpRadio);
        //--Input
        Vue.component('mp-input', mpInput);
        //--Tabs
        Vue.component('mp-tabs', mpTabs);
        Vue.component('mp-tabs-content', mpTabsContent);
        //--DtPicker(alias:DatetimePicker);
        Vue.component('mp-dt-picker', mpDtPicker);
        Vue.component('mp-datetime-picker', mpDtPicker);
        //--Scroller
        Vue.component('mp-scroller', mpScroller);
        //--RadioGroup
        Vue.component('mp-radio-group', mpRadioGroup);
        Vue.component('mp-radio-item', mpRadioItem);
        //--CheckboxGroup
        Vue.component('mp-checkbox-group', mpCheckboxGroup);
        Vue.component('mp-checkbox-item', mpCheckboxItem);
        //--Tile
        Vue.component('mp-tile', mpTile);
    }
}

export default MapleUI;