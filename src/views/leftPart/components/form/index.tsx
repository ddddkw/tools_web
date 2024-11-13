import {Form as AntForm} from 'antd'
export function Form(props: any){
    const {children} = props
    return (
        <div>
            <AntForm style={{width:'400px',height:'400px',border:'1px solid blue'}}>
                {
                    children && children.map((item:any)=>{
                        return(
                            <AntForm.Item>
                                {item}
                            </AntForm.Item>
                        )
                    })
                }
            </AntForm>
        </div>
    )
}
