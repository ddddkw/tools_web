import {Form as AntForm} from 'antd'
import {getComById} from "../../../../../utils/nodeUtils";
import Store from "../../../../../store";
export function Form(props: any){
    const { children, disabled, labelAlign, labelWrap, size, colon } = props
    return (
        <div>
            <AntForm
                disabled={disabled}
                labelAlign={labelAlign}
                labelWrap={labelWrap}
                size={size}
                colon={colon}
                style={{width:'400px',height:'400px', boxShadow: '0px 0px 5px gray'}}>
                {
                    children && children.map((item:any)=>{
                        return <AntForm.Item label={getComById(item.key, Store.getState().comList).label}>
                            {item}
                        </AntForm.Item>
                    })
                }
            </AntForm>
        </div>
    )
}
