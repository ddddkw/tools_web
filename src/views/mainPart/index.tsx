import './index.css'
import {useState} from "react";
import * as components from '../leftPart/components/exportAll'
export default function mainPart(){
    interface ComJson {
        comType: string,
        style?: any
    }
    const [comList, setComList] = useState<ComJson  []>([])
    const onDrop = (e: any) => {
        // 新加的代码。给对应的组件加上style
        const endLeft = e.clientX-332;
        const endTop = e.clientY-80;
        const style = {
            position: 'absolute',
            left: endLeft + 'px',
            top: endTop + 'px',
            zIndex:100
        }
        comList.push({
            comType: window.nowCom,
            style
        })
        setComList([...comList])
    }
    // 阻止浏览器的默认行为
    const onDragEnter = (e: any) => {
        e.preventDefault()
    }

    const onDragOver = (e: any) => {
        e.preventDefault()
    }


    return (
        <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} className='mainPart'>
            {
                comList.map(com => {
                    const Com = components[com.comType as keyof typeof components];
                    // 新加的代码，将style传递给组件
                    return <Com style={com.style} />
                })
            }
        </div>
    )
}
