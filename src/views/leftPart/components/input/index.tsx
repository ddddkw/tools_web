import {Input as AntInput} from "antd";
export default function Input(props: any) {
    const {size, disabled, allowClear,showCount,addonAfter,addonBefore} =props
    return (
        <div>
            <AntInput
                size={size}
                disabled={disabled}
                allowClear={allowClear}
                showCount={showCount}
                addonAfter={addonAfter}
                addonBefore={addonBefore}
            ></AntInput>
        </div>
    )
}
