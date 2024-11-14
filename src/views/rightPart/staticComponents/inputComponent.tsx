import {Input, Switch, Select, Button, ColorPicker} from "antd"
import {useState} from "react";

export default function InputComponent(props: any) {
    const [openModal, setOpenModal] = useState(false)
    const { onChange, type, defaultValue, selectNode, options, value, modalType,label  } = props
    // 获取组件的弹窗
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ModalComponent = require('../../../modal/index')[modalType || 'IconSelect'];
    const getComponent = () => {
        switch (type) {
            case 'input': {
                return <Input style={{width:'120px'}} value={selectNode[value]} defaultValue={defaultValue} onChange = {onChange}/>
            }
            case 'switch': {
                return <Switch defaultValue={defaultValue} value={selectNode[value]||false} onChange = {onChange}/>
            }
            case 'select': {
                return <Select value={selectNode[value]||defaultValue} style={{width:'120px'}}  options={options} defaultValue={defaultValue} onChange={onChange}></Select>
            }
            case 'number': {
                return <Input type="number" value={selectNode[value] || parseInt(selectNode?.comStyle?.[value] || '') || '0'} style={{width:'120px'}} defaultValue={defaultValue} onChange={onChange}/>
            }
            case 'modal': {
                return <Button onClick={showModal} >{label}</Button>
            }
            case 'color': {
                return  <ColorPicker allowClear showText mode={['single', 'gradient']} onChangeComplete={onChange}/>
            }
        }
    }
    const showModal=function () {
        setOpenModal(true)
    }
    return (
        <div>
            {getComponent()}
            <ModalComponent openModal={openModal} setOpenModal={setOpenModal}/>
        </div>
    )
}

