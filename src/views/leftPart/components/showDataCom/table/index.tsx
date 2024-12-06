import { useState, useEffect } from 'react';
import { Table as AntTable } from 'antd';
import http from "../../../../../utils/request";

export default function Table(props: any){
    const { tableName, schemaList, size, bordered, showHeader = true, pagination = false, comStyle } = props;
    const [entityData, setEntityData] = useState([])

    useEffect(() => {
        if(tableName) {
            http.get("beans/tables/queryTableData", {tableName})
                .then((res:any) => {
                    if(res.data) {
                        setEntityData(res.data)
                    }
                })
        }
    }, [tableName])

    const getColumns = () => {
        return (schemaList || []).map((item: any,index:any) => {
            if (item.fieldName ==='image') {
                return {
                    title: item.fieldName,
                    dataIndex: item.fieldName,
                    key: index,
                    render:getImagePreview
                }
            } else {
                return {
                    title: item.fieldName,
                    dataIndex: item.fieldName,
                    key: index
                }
            }

        })
    }
    const getImagePreview=function (text:any,record:any){
        return (
            <img style={{width:'40px',height:'40px'}} src={`data:image/jpeg;base64,${record.image}`}></img>
        )
    }
    const getData = () => {
        return entityData.map((item: any,index:any) => {
            return {
                key: index,
                ...item
            }
        })
    }

    return <AntTable
        dataSource={getData()}
        columns={getColumns()}
        size={size}
        pagination={pagination}
        bordered={bordered}
        showHeader={showHeader}
        style={{...comStyle}}
    />;
}

