import { Avatar as AntAvatar } from 'antd';

export default function Avatar(props: any) {
    const { src, comStyle, comId, icon, shape, size} = props
    console.log(icon,'avatarAttribute')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const IconComponent = require('@ant-design/icons')[icon || 'UserOutlined']
    return (
        <div>
            <AntAvatar
                size={ size || 40}
                icon={<IconComponent />}
                src={src}
                shape={shape}
                style={{...comStyle}}
            />
        </div>
    )
}
