import { buttonAttribute } from './components/buttonAttributes'
import { iconAttribute } from './components/iconAttributes'
import {inputAttributes} from "./components/inputAttributes";
import {checkBoxAttribute} from "./components/checkBoxAttributes";
import {radioAttribute} from "./components/radioAttributes";
import {rateAttributes} from "./components/rateAttributes";

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
    Rate:rateAttributes
}
export {
    attributeMap
}
