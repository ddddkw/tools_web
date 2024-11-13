import './index.css'
import {Tabs} from 'antd';
import type { TabsProps } from 'antd';
import {attributeMap} from "./staticUtils/attributesMaps";
import InputComponent from './staticComponents/inputComponent'
import Store from "../../store";
import {useState} from "react";
import {subscribeHook} from "../../store/subscribe";
import {getComById} from '../../utils/nodeUtils'
export default function rightPart(){
    // 将subscribeHook放在最上面的原因是，需要确保在访问store redux中的状态之前已经成功的订阅了store的变化
    subscribeHook()
    const comList = JSON.parse(JSON.stringify(Store.getState().comList))
    const selectCom = Store.getState().selectCom
    const selectNode = getComById(selectCom,comList)
    // eslint-disable-next-line no-debugger
    const getAttributePanel = () => {
        // 获取组件类型
        const comType = selectNode?.comType;
        console.log(comType,'comType')
        console.log(attributeMap,'attributeMap')
        // 拿到组件对应的属性列表
        const comAttributeList = attributeMap[comType] || []
        console.log(comAttributeList,'comAttributeList')
        return (
            <div>
                {
                    comAttributeList.map((item,index) => {
                        return <div key={index} className='attributeItem'>
                            <label className='attributeLabel'>{item.label}</label>
                            <div className='attributeItemValue'>
                                <InputComponent selectNode={selectNode} {...item} onChange={changeComAttribute(item.value)} />
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
    // 带过来的value入参是组件的属性名称
    const changeComAttribute = (value: string) => {
        return (e: any) => {
            let attribute = e
            if (typeof e === 'object') {
                attribute = e.target.value;
            }
            // 通过Store的dispatch更改组件属性
            selectNode[value] = attribute;
            Store.dispatch({type: 'changeComList', value:comList})
        }
    }
    const items: TabsProps['items'] = [
        {
            key: 'attributePanel',
            label: <div style={{fontSize:'18px',width:'150px',textAlign:'center'}}>属性</div>,
            children: getAttributePanel(),
        },
        {
            key: 'stylePanel',
            label: <div style={{fontSize:'18px',width:'150px',textAlign:'center'}}>样式</div>,
            children: 'Content of Tab Pane 2',
        }
    ];
    const [update, setUpdate] = useState({})
    const onChange = () => {
        setUpdate({a: 123})
    }

    return (
        <div >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}
