import './index.css'
import {useRef, useState} from "react";
import * as components from '../leftPart/components/exportAll'
export default function mainPart(){
    interface ComJson {
        comType: string,
        style?: any,
        comId: string,
    }
    const [comList, setComList] = useState<ComJson  []>([])
    const [dragCom, setDragCom] = useState<ComJson | null>(null)
    // 当前选中节点的comId
    const [selectId, setSelectId] = useState<string>('')
    // 用来保存鼠标的开始位置和结束位置
    const distance = useRef({
        startLeft: void 0,
        startTop: void 0,
        endLeft: void 0,
        endTop: void 0
    })
    const onDrop = (e: any) => {
        // 鼠标的结束位置
        distance.current.endLeft = e.clientX;
        distance.current.endTop = e.clientY;
        // 新加的代码。给对应的组件加上style
        const endLeft = e.clientX-300;
        const endTop = e.clientY-80;
        let style:any;
        const comId = `comId_${Date.now()}`
        if(window.nowCom === 'renderCom' && dragCom && dragCom.style) {
            dragCom.style = {
                ...dragCom.style,
                left: parseInt(dragCom.style.left) + (e.clientX - (distance.current.startLeft || 0)) + 'px',
                top: parseInt(dragCom.style.top) + (e.clientY - (distance.current.startTop || 0)) + 'px'
            }
        }else{
            style = {
                position: 'absolute',
                left: endLeft + 'px',
                top: endTop + 'px',
                zIndex:100
            }
            const comNode = {
                comType: window.nowCom,
                style,
                comId
            }
            comList.push(comNode)
            window.renderCom = comNode;
            window.comList = comList;
            window.setComList = setComList
            setSelectId(comId)
        }
        setComList([...comList])
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
            // 设置拖拽的节点和nowCom的固定值
            window.nowCom = 'renderCom';
            setDragCom(com);
            // 开始位置
            distance.current.startLeft = e.clientX;
            distance.current.startTop = e.clientY;
        }
    }
    const selectCom = (com: ComJson) => {
        return () => {
            // 点击事件设置选中节点的ID
            setSelectId(com.comId)
            // 所需要用到的组件标识符先挂载在window上，后面会使用redux进行替换
            window.renderCom = com;
            window.comList = comList;
            window.setComList = setComList
        }
    }
    return (
        <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='mainPart'>
            {
                comList.map(com => {
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
