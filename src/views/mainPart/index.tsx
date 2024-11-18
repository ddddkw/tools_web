import './index.css'
import {useRef, useState} from "react";
import * as components from '../leftPart/components/exportAll'
import componentTextMap  from '../leftPart/staticUtils/itemList'
import Store from "../../store";
import {getComById} from '../../utils/nodeUtils'
import {subscribeHook} from "../../store/subscribe";
import { includesList, leftDropContainer, mainDropContainer } from './staticUtils/includes'
export interface ComJson {
    comType: string,
    style?: any,
    comId: string,
    childList?: ComJson[] // 如果当前组件内有子组件的话，使用childList进行渲染
}
export default function mainPart(){
    let num = 1;
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
        // eslint-disable-next-line no-debugger
        distance.current.endLeft = e.clientX;
        distance.current.endTop = e.clientY;
        // 新加的代码。给对应的组件加上style
        const endLeft = e.clientX-300;
        const endTop = e.clientY-80;
        let style:any;
        const comId = `comId_${Date.now()}`
        if(dragComId) {
            const node = getComById(dragComId,comList)
            console.log(node,'node')
            node.style = {
                ...node.style,
                left: parseInt(node.style.left) + (e.clientX - (distance.current.startLeft || 0)) + 'px',
                top: parseInt(node.style.top) + (e.clientY - (distance.current.startTop || 0)) + 'px'
            }
            // 切记，拖拽完组件要记得清空这个id
            setDragComId('')
            Store.dispatch({type: 'changeSelectCom', value: dragComId});
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
                comId,
                caption: componentTextMap[nowCom] + num++
            }
            comList.push(comNode)
            // 更新Store，从而更新画布区
            Store.dispatch({type: 'changeSelectCom', value: comNode.comId})
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

    // 画布区的组件开始拖拽时的方法
    const onDragStart = (com: ComJson) => {
        return (e:any) => {
            // 在移动区内进行移动时，记录下移动的结点的唯一标识
            // 拖拽form表单内的组件时，由于是需要整个form表单进行移动，所以不可以组织时间冒泡，要使拖拽的comId是form的comId
            setDragComId(com.comId);
            // 开始位置
            distance.current.startLeft = e.clientX;
            distance.current.startTop = e.clientY;
        }
    }
    const selectCom = (com: ComJson) => {
        return (e:any) => {
            // 点击事件设置选中节点的ID
            setSelectId(com.comId)
            // 更新当前选中的节点
            Store.dispatch({type: 'changeSelectCom', value: com.comId});
            e.stopPropagation()
        }
    }
    // form内部的组件进行拖拽结束时且拖拽后的最终位置依旧是在form表单内时的回调方法
    // const onDropContainer = (com:ComJson)=> {
    //     return ((e:any)=>{
    //         // 获取当前拖拽的元素
    //         const dragCom = getComById(dragComId, comList)
    //         // 如果拖拽的元素是form表单的话
    //         if(['Form','Card'].includes(com.comType)) {
    //             // 如果在Form表单内拖拽且拖拽的不是form表单，只有在非第一次拖拽进入时会调用该条件内的方法
    //             if(dragCom && dragCom !== com) {
    //                 const index = comList.findIndex((item: any) => item.comId === dragCom?.comId);
    //                 if(index > -1) {
    //                     comList.splice(index, 1)
    //                 }
    //                 if(!com.childList) {
    //                     com.childList = []
    //                 }
    //                 delete dragCom.style
    //                 // 将拖拽进来push到form表单内当做item进行渲染
    //                 com.childList.push(dragCom);
    //                 Store.dispatch({type: 'changeComList', value: comList})
    //                 // 阻止冒泡事件
    //                 e.stopPropagation()
    //                 setDragComId('')
    //                 return;
    //             }else if(dragCom){
    //                 return;
    //             }
    //             const comId = `comId_${Date.now()}`
    //             const comNode = {
    //                 comType: nowCom,
    //                 comId,
    //                 caption: componentTextMap[nowCom] + num++
    //             }
    //             if(!com.childList) {
    //                 com.childList = []
    //             }
    //             com.childList.push(comNode);
    //             Store.dispatch({type: 'changeComList', value: comList})
    //             e.stopPropagation()
    //         }
    //     })
    // }
    const onDropContainer = (com: ComJson) => {
        return (e: any) => {
            const dragCom = getComById(dragComId, comList)
            if(Object.keys(includesList).includes(com.comType)) {
                // 如果是画布区的拖拽要先将节点从comList中删除掉
                if(dragCom && dragCom !== com) {
                    mainDropContainer(e, com, dragCom, comList);
                    setDragComId('')
                    return;
                }else if(dragCom){
                    // 拖拽的是容器本身
                    return;
                }
                // 从左侧列表进行拖拽
                leftDropContainer(e, com, nowCom, componentTextMap, comList);
            }
        }
    }
    const getComponents = (com:ComJson)=> {
        const Com = components[com.comType as keyof typeof components];
        return (
            // 在form表单内再添加一层拖拽事件，主要作用是用于处理在form表单内部拖拽组件
            <div onDrop={onDropContainer(com)} key={com.comId} onClick={selectCom(com)}>
                <div draggable onDragStart={onDragStart(com)}>
                    <div className={com.comId==selectId?'selectCom':''} style={com.style} >
                        <Com {...com}>
                            {
                                com.childList&&com.childList.map((item:ComJson)=>{
                                    return getComponents(item)
                                })
                            }
                        </Com>
                    </div>
                </div>
            </div>
        )
    }
    return (
        // onDrop是被拖入的父级元素的回调事件
        <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='mainPart'>
            {
                comList.map((com:ComJson) => {
                    // 获取所有已拖拽的子组件并将其渲染到画布上
                    return getComponents(com)
                })
            }
        </div>
    )
}
