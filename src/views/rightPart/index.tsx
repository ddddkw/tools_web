import './index.css'
import {Tabs} from 'antd';
import type { TabsProps } from 'antd';
import {attributeMap} from "./staticUtils/attributesMaps";
import InputComponent from './staticComponents/inputComponent'
import {useState} from "react";

export default function rightPart(){
    const getAttributePanel = () => {
        const comType = window.renderCom?.comType;
        // 拿到组件对应的属性列表
        const comAttributeList = attributeMap[comType] || []
        return (
            <div>
                {
                    comAttributeList.map((item,index) => {
                        return <div key={index} className='attributeItem'>
                            <label className='attributeLabel'>{item.label}</label>
                            <div className='attributeItemValue'>
                                <InputComponent {...item} onChange={changeComAttribute(item.value)} />
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
            window.renderCom[value] = attribute;
            window.setComList([...window.comList])
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
        <div className='rightCom'>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}
