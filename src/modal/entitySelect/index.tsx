import {Modal, Table, TableProps , message } from "antd";
import http from "../../utils/request";
import { useEffect, useState} from "react";
import Store from "../../store";
import {getComById} from "../../utils/nodeUtils";

export default function EntitySelect(props: any) {
    const [messageApi, contextHolder] = message.useMessage();
    const {openModal, setOpenModal} = props
    const [dataSource, setDataSource] = useState<any>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const comList = JSON.parse(JSON.stringify(Store.getState().comList))
    const selectCom = Store.getState().selectCom // 获取选中的节点
    const selectNode = getComById(selectCom, comList) // 获取选中的节点
    const queryAllEntity = function () {
        http.get("beans/tables/getTables")
            .then((res: any) => {
                const middleData:any= []
                res.data.forEach((item: any, index: any)=>{
                    middleData.push({key:index,entityName:item})
                })
                setDataSource(middleData)
            })
    }
    const onSelectChange = (newSelectedRowKeys:any) => {
        setSelectedRowKeys(newSelectedRowKeys ? newSelectedRowKeys : [])
    };
    const queryTableColumns = function (val:string){
        http.get("beans/tables/getColumns",{tableName:val})
            .then((res: any) => {
                selectNode.schemaList = res.data
                selectNode.tableName = val
                Store.dispatch({type: 'changeComList', value:comList})
                setOpenModal(false)
            })
    }
    const selectOk = function (){
        if (rowSelection.selectedRowKeys.length>1) {
            message.warning('选择一条数据后进行操作');
        } else {
            const tableName  = dataSource[rowSelection.selectedRowKeys[0]].entityName
            queryTableColumns(tableName)
        }
    }
    useEffect(()=>{
        queryAllEntity()
    },[]) // 加上[]是让useEffect只在组件挂载的时候运行一次
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: '实体类',
            dataIndex: 'entityName',
            key: 'entityName',
        },
    ];

    return(
        <Modal open={openModal} onCancel={()=>{setOpenModal(false)}} onOk={()=>{selectOk()}}>
            <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
        </Modal>
    )
}
