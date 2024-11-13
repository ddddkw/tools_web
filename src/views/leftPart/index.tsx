import './index.css'
import {Collapse, FloatButton, Tabs} from 'antd';
import type { TabsProps } from 'antd';
import * as components from './components/exportAll'
import Store from "../../store";
import componentTextMap from './staticUtils/itemList'
import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import {useState} from "react";
import type { CollapseProps } from 'antd';
export default function leftPart(){
    const [showVisible,setShowVisible] = useState(false)
    // 直接将数据挂到window上
    const onDragStart = (name: string) => {
        return () => {
            // 在redux中记录下当前拖拽的节点
            Store.dispatch({type: 'changeNowCom', value: name});
        }
    }
    const renderComponent = (comTypeList: string[]) => {
        const list = Object.keys(components).filter(item => comTypeList.includes(item))
        console.log(list,'list-------------')
        return <div className="componentGroup">
            {
                list.map(name => {
                    console.log(name)
                    const text = componentTextMap[name]
                    return <div key={name} className='componentItem'>
                        {/*定义一个全局变量用于存储当前拖拽的组件的名称*/}
                        <div onDragStart={onDragStart(name)} draggable style={{display: 'inline-block'}}><span>{text}</span></div>
                    </div>
                })
            }
        </div>

    }
    // 每个折叠面板下，根据不同的组件列表类型，展示不同的组件
    const collapseItems: CollapseProps['items'] = [
        {
            key: 'enterDataCom',
            label: '数据录入组件',
            children: renderComponent(['Input','Checkbox','Radio','Rate','Switch']),
        },
        {
            key: 'containerCom',
            label: '容器组件',
            children: renderComponent(['Form', 'Card','Badge', 'Carousel'])
        },
        {
            key: 'currentrCom',
            label: '通用组件',
            children: renderComponent(['Button','Icon','FloatButton']),
        },
        {
            key: 'feedbackCom',
            label: '反馈组件',
            children: renderComponent(['Alert','Progress'])
        },
        {
            key: 'showDataCom',
            label: '数据展示组件',
            children: renderComponent(['QRCode','Tag','Avatar','Image','Table'])
        }
    ];
    // 定义tabs组件的两个选项框，就是tab-pane中的内容
    const items: TabsProps['items'] = [
        {
            key: 'component',
            label: <div style={{fontSize:'18px',width:'150px',textAlign:'center'}}>组件</div>,
            children: <Collapse className='comCollapse' ghost items={collapseItems} defaultActiveKey={'enterDataCom'}/>,
        },
        {
            key: 'data',
            label: <div style={{fontSize:'18px',width:'150px',textAlign:'center'}}>数据</div>,
            children: 'Content of Tab Pane 2',
        }
    ];
    const onChange = () => {
        console.log(111)
    }
    const changeVisible = function (){
        setShowVisible(!showVisible)
    }
    return (
        <div className={showVisible?"leftContainer":'noLeftContainer'}>
            {showVisible?<Tabs defaultActiveKey="1" items={items} onChange={onChange} />:''}
            {showVisible?<LeftCircleTwoTone onClick={()=>{changeVisible()}} className={'flag'}/>:<RightCircleTwoTone onClick={()=>{changeVisible()}} className={'flag'}/>}
        </div>
    )
}
