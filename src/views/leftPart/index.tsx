import './index.css'
import {FloatButton, Tabs} from 'antd';
import type { TabsProps } from 'antd';
import * as components from './components/exportAll'
import Store from "../../store";
import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import {useState} from "react";
export default function leftPart(){
    const [showVisible,setShowVisible] = useState(false)
    // 直接将数据挂到window上
    const onDragStart = (name: string) => {
        return () => {
            // 在redux中记录下当前拖拽的节点
            Store.dispatch({type: 'changeNowCom', value: name});
        }
    }
    const renderComponet = () => {
        return <div className="componentGroup">
            {
                Object.keys(components).map(name => {
                    return <div key={name} className='componentItem'>
                        {/*定义一个全局变量用于存储当前拖拽的组件的名称*/}
                        <div onDragStart={onDragStart(name)} draggable style={{display: 'inline-block'}}><span>{name}</span></div>
                    </div>
                })
            }
        </div>

    }
    // 定义tabs组件的两个选项框
    const items: TabsProps['items'] = [
        {
            key: 'component',
            label: <div style={{fontSize:'18px',width:'150px',textAlign:'center'}}>组件</div>,
            children: renderComponet(),
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
