import styles from './index.module.css'
import http from '../../../utils/request';
import {useEffect, useState} from "react";
import {Button, Card, Divider, Input} from "antd";
import AddTable from '../../../modal/addTable/index'
import {DataMaintenance} from "./components/dataMaintenance";

const { Search } = Input;

export function DatabaseManage(){
    const [addTableVisible, setAddTableVisible] = useState(false);
    const [pageType,setPageType]=useState('');
    const [tableName,setTableName]=useState('');
    const [editDataVisible,setEditDataVisible]=useState(false);
    const tableMaps ={
        'images':'图片库',
        'pages':'页面库'
    }
    const [tableList,setTableList] = useState([]);
    const queryList = function (){
        http.get('beans/tables/getTables').then((res:any)=>{
            setTableList(res.data)
        })
    }
    const addDatabase=function (){
        setAddTableVisible(true)
    }
    useEffect(()=>{
        queryList()
    }, [])
    const previewTable =function (val: string){
        setTableName(val);
        setPageType('preview')
        setAddTableVisible(true)
    }
    const editTable =function (val: string){
        setTableName(val);
        setPageType('edit')
        setAddTableVisible(true)
    }
    const dataMaintenance=function (val:string) {
        setTableName(val)
        setEditDataVisible(true)
    }
    const changeDataVisible = function (){
        setEditDataVisible(false)
    }
    return(
        <div className={styles.databaseContainer}>
            {
                !editDataVisible? <div>
                    <div className={styles.searchItem}>
                        <Search placeholder="input search text" allowClear style={{ width: 200 }} />&nbsp;&nbsp;
                        <Button onClick={addDatabase}>新建数据库</Button>
                    </div>
                    <Divider />
                    <div className={styles.databaseBody}>
                        {
                            tableList.map((item:string)=>{
                                const title = tableMaps[item as keyof typeof tableMaps]
                                return (
                                    <Card title={title} bordered={false} key={item} className={styles.databaseItem}>
                                        <Button onClick={() => previewTable(item)}>预览</Button>&nbsp;&nbsp;
                                        <Button onClick={() => editTable(item)}>编辑</Button>&nbsp;&nbsp;
                                        <Button onClick={() => dataMaintenance(item)}>数据维护</Button>
                                    </Card>
                                )
                            })
                        }
                    </div>
                    {
                        addTableVisible?<AddTable addTableVisible={addTableVisible} setAddTableVisible={setAddTableVisible} pageType={pageType} tableName={tableName} setTableName={setTableName} />:''
                    }
                </div>:<DataMaintenance tableName={tableName} changeDataVisible={changeDataVisible}></DataMaintenance>
            }
        </div>
    )
}
