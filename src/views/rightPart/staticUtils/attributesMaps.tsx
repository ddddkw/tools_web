import { buttonAttribute } from './comAttributes/buttonAttributes'
import { iconAttribute } from './comAttributes/iconAttributes'
import {inputAttributes} from "./comAttributes/inputAttributes";
import {checkBoxAttribute} from "./comAttributes/checkBoxAttributes";
import {radioAttribute} from "./comAttributes/radioAttributes";
import {rateAttributes} from "./comAttributes/rateAttributes";
import {formAttribute} from "./comAttributes/formAttributes";

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
    Form:formAttribute
}
export {
    attributeMap
}
