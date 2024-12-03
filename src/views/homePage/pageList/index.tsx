import styles from './index.module.css';
import { Divider, Input, Button, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import http from '../../../utils/request';
import {useEffect, useState} from "react";

const { Search } = Input;

export function PageList() {
    const navigate = useNavigate();
    const [queryForm,setQueryForm] =useState({
        pageIndex:1,
        pageSize:10
    })
    const [pageList, setPageList] = useState<any>([])

    useEffect(()=>{
        queryList()
    },[])
    const onSearch = () => {
        console.log(111);
    };

    const toAdd = () => {
        navigate('/BuildPage');
    };

    const queryList = () => {
        http.post('beans/Pages/queryList',queryForm)
            .then((res: any) => {
                setPageList(res.data.records)
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    };

    const previewPage = (val: any) => {
        http.get('beans/Pages/queryDetail',{id:val.id})
            .then((res: any) => {
                console.log(111)
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
        navigate(`/BuildPage?preview=${val}`);
    };

    const editPage = (val: any) => {
        http.get('beans/Pages/queryDetail',{id:val.id})
            .then((res: any) => {
                console.log(111)
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
        navigate(`/BuildPage?edit=${val}`);
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.searchItem}>
                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />&nbsp;&nbsp;
                <Button onClick={toAdd}>新建页面</Button>
            </div>
            <Divider />
            <div className={styles.pageBody}>
                {pageList.map((item:any) => (
                    <Card key={item} className={styles.pageItem} title={item.pageName} extra={<DeleteOutlined />}>
                        <Button onClick={() => previewPage(item)}>预览页面</Button>&nbsp;&nbsp;
                        <Button onClick={() => editPage(item)}>编辑页面</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
