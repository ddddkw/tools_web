import { Modal } from 'antd'
import iconList from './iconMap.json'
import './index.css'
import {useEffect, useState} from "react";
import { getComById } from "../../utils/nodeUtils";
import Store from "../../store";
export default function IconSelect(props: any) {
    const { openModal, setOpenModal } = props;
    const [selectItem, setSelectItem] =useState<string>()
    const comList = JSON.parse(JSON.stringify(Store.getState().comList))
    const selectCom = Store.getState().selectCom
    const selectNode = getComById(selectCom,comList)
    useEffect(() => {
        setSelectItem(selectNode.type)
    },[openModal])
    const handleOk = () => {
        selectNode.type = selectItem
        Store.dispatch({type:'changeComList',value:comList})
        setSelectItem('')
        setOpenModal(false)
    }
    const handleCancel = () => {
        setOpenModal(false)
        setSelectItem('')
    }
    const selectIcon = function (val:string) {
        setSelectItem(val)
    }
    return (
        <div>
            <Modal open={openModal} onOk={handleOk} onCancel={handleCancel}>
               <div className={'mapList'}>
                   {
                       iconList.map(item=>{
                           // eslint-disable-next-line @typescript-eslint/no-var-requires
                           const IconComponent = require("@ant-design/icons")[item]
                           return(
                               <div className={selectItem===item?'activeIcon':'iconItem'} key={item} onClick={()=>{selectIcon(item)}}>
                                   <IconComponent></IconComponent>
                               </div>
                           )
                       })
                   }
               </div>
            </Modal>
        </div>
    )
}

