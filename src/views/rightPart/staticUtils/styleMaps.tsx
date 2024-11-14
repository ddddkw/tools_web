import { buttonStyle } from "./comStyle/buttonStyle"
import {cardStyle} from "./comStyle/cardStyle";
import {floatButtonStyle} from "./comStyle/floatButtonStyle";

interface StyleMap {
    [key: string]: Style[]
}

export interface Style {
    label: string,
    value: string,
    type: string,
    options?: Array<any>,
    defaultValue?: string,
    modalType?: string
}

const styleMap: StyleMap = {
    Button: buttonStyle,
    Card: cardStyle,
    FloatButton:floatButtonStyle
}

export {
    styleMap
}
