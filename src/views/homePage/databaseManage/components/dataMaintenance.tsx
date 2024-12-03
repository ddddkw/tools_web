import styles from  './dataMaintenance.module.css'
import {Table, Button, Upload, UploadFile, Modal, Input, Form} from "antd";
import {useEffect, useState} from "react";
import http from "../../../../utils/request";
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import {UploadChangeParam} from "antd/lib/upload";

export function DataMaintenance(props:any){
    const {tableName, changeDataVisible} = props;
    const [dataSource,setDataSource] = useState();
    const [columns,setColumns] = useState<any>();
    const [addColumns,setAddColumns] = useState<any>([]);
    const [addFileList,setAddFileList] = useState<any>([])
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [addForm,setAddForm] = useState({})
    const [form] = Form.useForm();
    useEffect(()=>{
        queryColumns()
        queryTableData()
    },[])
    const getImagePreview=function (text:any,record:any){
        return (
            <img style={{width:'40px',height:'40px'}} src={`data:image/jpeg;base64,${record.image}`}></img>
        )
    }
    const queryColumns = function (){
        http.get('beans/tables/getColumns',{tableName:tableName}).then((res:any)=>{
            const list = res.data.map((item: any, index: any)=>{
                return item.fieldName == 'image'?{key:index,title:item.fieldName,dataIndex:item.fieldName,render:getImagePreview}:{key:index,title:item.fieldName,dataIndex:item.fieldName,...item}
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
        form.resetFields()
        setIsModalOpen(true)
        const newData={}
        columns.forEach((item:any)=>{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.fieldName?newData[item.fieldName] ='':''
        })
        const middleColumns = [newData]
        setAddColumns(middleColumns)
    }
    const handleOk = function (){
        http.post('beans/tables/insertData',{tableName:tableName,dataList:[addForm]}).then(res=>{
            setIsModalOpen(false)
            queryTableData()
        })
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
    const  inputData= function (e:any,value:any) {
        setAddForm(prevState => ({
            ...prevState,
            [value]: e.target.value
        }));
    }
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
            {
                // addColumns需要做非空判断
                Array.isArray(addColumns) && addColumns.length > 0 ?(<Modal width={1000} title="新增数据" open={isModalOpen} onOk={handleOk} onCancel={()=>{setIsModalOpen(false)}}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                        >
                            {
                                (Object.keys(addColumns[0]) as string[]).map((value:any, index:any) => (
                                    <><Form.Item
                                        label={value}
                                        name={value}
                                    >
                                        <Input disabled={index==0} onChange={(e)=>{inputData(e,value)}}/>
                                    </Form.Item></>
                                ))
                            }
                        </Form>
                </Modal>):''
            }

        </div>
    )
}
