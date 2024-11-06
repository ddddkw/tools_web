export default function Icon(props:any){
    const { rotate, spin, type } = props;
    // 根据type来返回对应的Icon
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const IconComponent = require('@ant-design/icons')[type || 'HomeOutlined']
    return(
        <div>
            <IconComponent rotate={rotate} spin={spin} type={type}></IconComponent>
        </div>
    )
}
