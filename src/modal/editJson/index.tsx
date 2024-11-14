import { Modal, Typography } from 'antd'
import Store from "../../store";
import {getComById} from "../../utils/nodeUtils";
const { Paragraph } = Typography;
export default function EditJson(props:any){
    const {showJson,setShowJson,jsonComId} = props
    const comList = JSON.parse(JSON.stringify(Store.getState().comList))
    const curNode = getComById(jsonComId,comList)
    return(
        // onCancel和onOk方法中应该是一个函数方法，setShowJson(false)是函数结果，在渲染的时候会直接执行
        <Modal
            open={showJson}
            onCancel={()=>{setShowJson(false)}}
            onOk={()=>{setShowJson(false)}}
        >
            {/*Paragraph 组件用于包裹文本内容，并可以包含其他 HTML 元素，如 <pre>，以便更好地格式化和显示文本。*/}
            <Paragraph
                style={{
                    maxWidth: 440,
                    marginTop: 24,
                }}
            >
                <pre
                    style={{
                        border: 'none',
                        height:'370px',
                        width:'450px',
                        overflow:'auto'
                    }}
                >
                  {JSON.stringify(curNode, null, 2)}
                </pre>
            </Paragraph>
        </Modal>
    )
}
