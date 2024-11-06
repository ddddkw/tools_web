import { buttonAttribute } from './components/buttonAttributes'
import { iconAttribute } from './components/iconAttributes'
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
    Icon: iconAttribute
}
export {
    attributeMap
}
