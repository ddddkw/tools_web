import {Card as AntCard} from "antd";
export function Card(props:any) {
    const {children,caption,size,hoverable,comStyle} = props
    return (
        <AntCard title={caption|| "默认标题"} size={size} hoverable={hoverable} style={{width: '300px', height:'300px',...comStyle}}>
            {
                children&&children.map((item:any)=>{
                    return(
                        item
                    )
                })
            }
        </AntCard>
    )
}
