import { buttonAttribute } from './comAttributes/buttonAttributes'
import { iconAttribute } from './comAttributes/iconAttributes'
import {inputAttributes} from "./comAttributes/inputAttributes";
import {checkBoxAttribute} from "./comAttributes/checkBoxAttributes";
import {radioAttribute} from "./comAttributes/radioAttributes";
import {rateAttributes} from "./comAttributes/rateAttributes";
import {formAttribute} from "./comAttributes/formAttributes";
import {cardAttribute} from "./comAttributes/cardAttributes";
import {floatButtonAttribute} from "./comAttributes/floatButtonAttributes";
import {alertAttribute} from "./comAttributes/alertAttributes";
import {progressAttribute} from "./comAttributes/progressAttributes";
import {qrcodeAttribute} from "./comAttributes/qrCodeAttributes";
import {tagAttribute} from "./comAttributes/tagAttributes";
import {avatarAttribute} from "./comAttributes/avatarAttributes";

interface AttributeMap {
    [key: string]: ComAttribute[]
}

interface ComAttribute {
    label: string,
    value: string,
    type: string,
    options?: Array<any>,
    defaultValue?: string
}
const attributeMap: AttributeMap = {
    Button: buttonAttribute,
    Icon: iconAttribute,
    Input:inputAttributes,
    Checkbox:checkBoxAttribute,
    Radio:radioAttribute,
    Rate:rateAttributes,
    Form:formAttribute,
    Card:cardAttribute,
    FloatButton:floatButtonAttribute,
    Alert: alertAttribute,
    Progress:progressAttribute,
    QRCode: qrcodeAttribute,
    Tag: tagAttribute,
    Avatar: avatarAttribute
}
export {
    attributeMap
}
