import styles from  './dataMaintenance.module.css'
import {Table, Button, Upload, UploadFile, Modal, Input} from "antd";
import {useEffect, useState} from "react";
import http from "../../../../utils/request";
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import {UploadChangeParam} from "antd/lib/upload";

export function DataMaintenance(props:any){
    const {tableName, changeDataVisible} = props;
    const [dataSource,setDataSource] = useState();
    const [columns,setColumns] = useState<any>();
    const [addColumns,setAddColumns] = useState<any>();
    const [addFileList,setAddFileList] = useState<any>([])
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [addDataSource,setAddDataSource] = useState([])
    const [emptyColumn,setEmptyColumn] = useState<any>()
    useEffect(()=>{
        queryColumns()
        queryTableData()
    },[])
    const getImagePreview=function (text:any,record:any){
        return (
            <img style={{width:'40px',height:'40px'}} src={`data:image/jpeg;base64,${record.image}`}></img>
        )
    }
    const getInputRender = function (text:any,record:any){
        return (
            <Input></Input>
        )
    }
    const getAddOperation = function (text:any,record:any,rowIndex:any){
        return (
            <Button onClick={()=>{deleteAddData(record,rowIndex)}}>删除</Button>
        )
    }
    const queryColumns = function (){
        http.get('beans/tables/getColumns',{tableName:tableName}).then((res:any)=>{
            const list = res.data.map((item: any, index: any)=>{
                return item.fieldName == 'image'?{key:item.fieldName,title:item.fieldName,dataIndex:item.fieldName,render:getImagePreview}:{key:item.fieldName,title:item.fieldName,dataIndex:item.fieldName,...item}
            })
            const operation = [{key:list.length+1,title:'操作',dataIndex:'operation',render:getOperations}]
            setColumns([...list,...operation])
        })
    };
    const queryTableData = function (){
        http.get('beans/tables/queryTableData',{tableName:tableName}).send(true).then((res:any)=>{
            setDataSource(res.data)
        })
    }
    const reBack = function (){
        changeDataVisible()
    }
    const addData=function (){
        const newData: Record<string, string>={}
        columns.forEach((item:any)=>{
            item.fieldName?newData[item.fieldName] ='':''
        })
        const middleColumns = columns.map((item:any)=>{
            return item.fieldName?{...item,render:getInputRender }:{...item, render:getAddOperation}
        })
        setAddColumns(middleColumns)
        setEmptyColumn(newData)
        if (addDataSource.length<1) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setAddDataSource([...addDataSource, newData])
        }
        setIsModalOpen(true)
    }
    const handleOk = function (){
        console.log(111)
    }
    const addDataHandler = function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setAddDataSource([...addDataSource,emptyColumn])
        console.log(addDataSource,'addDataSource')
    }
    const deleteAddData = (record:any,rowIndex:any)=>{
        console.log(addDataSource,'addDataSource')
        if (addDataSource.length>1) {
            addDataSource.splice(rowIndex,1)
            setAddDataSource(addDataSource)
        }
    }
    const deleteData = (record:any)=>{
        http.post('beans/tables/deleteData',{tableName:tableName,id:record.id}).then(res=>{
            queryTableData()
        })
    }
    const getOperations = (text:any,record:any)=>{
        return (
            <Button onClick={()=>{deleteData(record)}}>删除</Button>
        )
    }
    const handleChange = ({ file, fileList, event }: UploadChangeParam<UploadFile<any>>) => {
        setAddFileList(fileList)
        if (file.status==='done') {
            queryTableData()
        }
    };
    return(
        <div className={styles.dataMaintenanceBody}>
            <div className={styles.buttonBody}>
                <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} onClick={()=>{reBack()}}/>
                {
                    tableName==='images'?
                        <Upload
                        action="http://localhost:1023/beans/image/upload"
                        fileList={addFileList}
                        onChange={handleChange}
                    >
                       <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>:<Button type="primary"  onClick={()=>{addData()}}>新增数据</Button>
                }
            </div>
            <Table dataSource={dataSource} columns={columns}></Table>
            <Modal width={1000} title="新增数据" open={isModalOpen} onOk={handleOk} onCancel={()=>{setIsModalOpen(false)}}>
                <Button style={{float:"right", marginBottom:'10px'}} onClick={addDataHandler}> 新增 </Button>
                <Table dataSource={addDataSource} columns={addColumns}></Table>
            </Modal>
        </div>
    )
}
