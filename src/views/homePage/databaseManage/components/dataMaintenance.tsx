import styles from  './dataMaintenance.module.css'
import { Table, Button } from "antd";
import {useEffect, useState} from "react";
import http from "../../../../utils/request";
import { ArrowLeftOutlined } from '@ant-design/icons';

export function DataMaintenance(props:any){
    const {tableName, changeDataVisible} = props;
    const [dataSource,setDataSource] = useState();
    const [columns,setColumns] = useState<any>();
    useEffect(()=>{
        queryColumns()
    },[])
    const queryColumns = function (){
        http.get('beans/tables/getColumns',{tableName:tableName}).then((res:any)=>{
            const list = res.data.map((item: any, index: any)=>{
                return {key:item.fieldName,title:item.fieldName,dataIndex:item.fieldName,...item}
            })
            const operation = [{key:list.length+1,title:'操作',dataIndex:'operation',render:getOperations}]
            setColumns([...list,...operation])
        })
    };
    const queryTableData = function (){
        console.log(111)
    }
    const reBack = function (){
        changeDataVisible()
    }
    const addData=function (){
        console.log(111)
    }
    const deleteData = (record:any)=>{
        console.log(1111)
    }
    const getOperations = (text:any,record:any)=>{
        return (
            <Button onClick={()=>{deleteData(record)}}>删除</Button>
        )
    }
    return(
        <div className={styles.dataMaintenanceBody}>
            <div className={styles.buttonBody}>
                <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} onClick={()=>{reBack()}}/>
                <Button type="primary"  onClick={()=>{addData()}}>新增数据</Button>
            </div>
            <Table dataSource={dataSource} columns={columns}></Table>
        </div>
    )
}
