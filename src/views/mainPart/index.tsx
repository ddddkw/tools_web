import './index.css'
import {useRef, useState} from "react";
import * as components from '../leftPart/components/exportAll'
import Store from "../../store";
import {subscribeHook} from "../../store/subscribe";
export default function mainPart(){
    interface ComJson {
        comType: string,
        style?: any,
        comId: string,
    }
    // 拿到当前拖拽的节点类型
    const nowCom = Store.getState().dragCom
    const comList = JSON.parse(JSON.stringify(Store.getState().comList))
    // const [dragCom, setDragCom] = useState<ComJson | null>(null)
    // 当前选中节点的comId
    const [selectId, setSelectId] = useState<string>('')
    const [dragComId, setDragComId] = useState<string>('')
    // 用来保存鼠标的开始位置和结束位置
    const distance = useRef({
        startLeft: void 0,
        startTop: void 0,
        endLeft: void 0,
        endTop: void 0
    })
    subscribeHook()
    const onDrop = (e: any) => {
        // 鼠标的结束位置
        distance.current.endLeft = e.clientX;
        distance.current.endTop = e.clientY;
        // 新加的代码。给对应的组件加上style
        const endLeft = e.clientX-300;
        const endTop = e.clientY-80;
        let style:any;
        const comId = `comId_${Date.now()}`
        if(dragComId) {
            const node = comList.find((item:ComJson) => item.comId === dragComId)
            node.style = {
                ...node.style,
                left: parseInt(node.style.left) + (e.clientX - (distance.current.startLeft || 0)) + 'px',
                top: parseInt(node.style.top) + (e.clientY - (distance.current.startTop || 0)) + 'px'
            }
            // 切记，拖拽完组件要记得清空这个id
            setDragComId('')
        }else{
            style = {
                position: 'absolute',
                left: endLeft + 'px',
                top: endTop + 'px',
                zIndex:100
            }
            const comNode = {
                comType: nowCom,
                style,
                comId
            }
            comList.push(comNode)
            // 更新Store，从而更新画布区
            Store.dispatch({type: 'changeComList', value: comList})
            setSelectId(comId)
        }
        // 更新Store，从而更新画布区
        Store.dispatch({type: 'changeComList', value: comList})
    }
    // 阻止浏览器的默认行为
    const onDragEnter = (e: any) => {
        e.preventDefault()
    }

    const onDragOver = (e: any) => {
        e.preventDefault()
    }

    // 画布区的组件拖拽方法
    const onDragStart = (com: ComJson) => {
        return (e:any) => {
            // 在移动区内进行移动时，记录下移动的结点的唯一标识
            setDragComId(com.comId);
            // 开始位置
            distance.current.startLeft = e.clientX;
            distance.current.startTop = e.clientY;
        }
    }
    const selectCom = (com: ComJson) => {
        return () => {
            // 点击事件设置选中节点的ID
            setSelectId(com.comId)
        }
    }
    return (
        <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='mainPart'>
            {
                comList.map((com:ComJson) => {
                    const Com = components[com.comType as keyof typeof components];
                    // 新加的代码，将style传递给组件
                    return (
                        <div onClick={selectCom(com)} key={com.comId} draggable onDragStart={onDragStart(com)}>
                            <div className={com.comId==selectId?'selectCom':''} style={com.style} >
                                <Com {...com}/>
                            </div>
                        </div>
                        )
                })
            }
        </div>
    )
}
