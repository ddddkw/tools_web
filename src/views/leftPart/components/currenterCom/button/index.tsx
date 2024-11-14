import {Button as AntButton} from 'antd'
export default function Button(props: any) {
    const { caption, danger, disabled, ghost, comStyle, shape, size} = props
    return (
        <div>
            <AntButton
                style={{...comStyle}}
                danger={danger}
                disabled={disabled}
                ghost={ghost}
                shape={shape}
                size={size}
            >
                {caption||'按钮'}
            </AntButton>
        </div>
    )
}
