import { Alert as AntAlert } from 'antd';

export default function Alert(props: any) {
    const { comStyle, comId, message,caption, type,showIcon} = props
    return (
        <div>
            <AntAlert
                style={{...comStyle}}
                type={type}
                showIcon={showIcon}
                message={ message || 'Success Text'}
            />
        </div>
    )
}
