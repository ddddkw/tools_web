import { useState, useEffect } from 'react';
import { Table as AntTable } from 'antd';
import http from "../../../../../utils/request";

export default function Table(props: any){
    const { entityCode, schemaList, size, bordered, showHeader = true, pagination = false, comStyle } = props;
    const [entityData, setEntityData] = useState([])

    useEffect(() => {
        if(entityCode) {
            http.post("http://localhost:4000/entity/getEntityData", {entityCode})
                .then((res:any) => {
                    if(res.data.data) {
                        setEntityData(res.data.data)
                    }
                })
        }
    }, [entityCode])

    const getColumns = () => {
        return (schemaList || []).map((item: any) => {
            return {
                title: item,
                dataIndex: item,
                key: item
            }
        })
    }

    const getData = () => {
        return entityData.map((item: any) => {
            return {
                key: item._id,
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

