import './index.css'
import http from '../../../utils/request';
import {useEffect, useState} from "react";
import {Button, Card, Divider, Input} from "antd";
import AddTable from '../../../modal/addTable/index'
const { Search } = Input;

export function DatabaseManage(){
    const [addTableVisible, setAddTableVisible] = useState(false);
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
        console.log(val)
    }
    const editTable =function (val: string){
        console.log(val)
    }
    return(
        <div className={'databaseContainer'}>
            <div className={'searchItem'}>
                <Search placeholder="input search text" allowClear style={{ width: 200 }} />&nbsp;&nbsp;
                <Button onClick={addDatabase}>新建数据库</Button>
            </div>
            <Divider />
            <div className={'databaseBody'}>
                {
                    tableList.map((item:string)=>{
                        const title = tableMaps[item as keyof typeof tableMaps]
                        return (
                            <Card title={title} bordered={false} key={item} className={'databaseItem'}>
                                <Button onClick={() => previewTable(item)}>预览</Button>&nbsp;&nbsp;
                                <Button onClick={() => editTable(item)}>编辑</Button>
                            </Card>
                        )
                    })
                }
            </div>
            {
                addTableVisible?<AddTable addTableVisible={addTableVisible} setAddTableVisible={setAddTableVisible}/>:''
            }
        </div>
    )
}
