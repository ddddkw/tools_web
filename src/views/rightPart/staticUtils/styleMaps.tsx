import { buttonStyle } from "./comStyle/buttonStyle"
import {cardStyle} from "./comStyle/cardStyle";

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
    Card: cardStyle
}

export {
    styleMap
}
