import { Modal, Typography } from 'antd';
import React, {useEffect, useState} from "react";
import { Button, Select, Input, Popconfirm, Table } from 'antd';
import http from "../../utils/request";
const { Paragraph } = Typography;

interface DataType {
    key: number,
    fieldName: string;
    fieldType: string;
}

export default function AddTable(props: any) {
    const {addTableVisible,setAddTableVisible} = props;
    const [tableName,setTableName] = useState('');
    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: 1,
            fieldName: '',
            fieldType: '',
        },
    ]);

    const [count, setCount] = useState(2);
    const filedTypeOptions =[
        { value: 'TINYINT', label: 'TINYINT' },
        { value: 'SMALLINT', label: 'SMALLINT' },
        { value: 'MEDIUMINT', label: 'MEDIUMINT' },
        { value: 'INT', label: 'INT' },
        { value: 'BIGINT', label: 'BIGINT' },
        { value: 'FLOAT', label: 'FLOAT' },
        { value: 'DOUBLE', label: 'DOUBLE' },
        { value: 'DATE', label: 'DATE' },
        { value: 'TIME', label: 'TIME' },
        { value: 'DATETIME', label: 'DATETIME' },
        { value: 'TIMESTAMP', label: 'TIMESTAMP' },
        { value: 'YEAR', label: 'YEAR' },
        { value: 'CHAR', label: 'CHAR' },
        { value: 'VARCHAR', label: 'VARCHAR' },
        { value: 'TEXT', label: 'TEXT' },
        { value: 'BLOB', label: 'BLOB' },
        { value: 'JSON', label: 'JSON' },
    ]
    const columns = [
        {
            title: '字段名',
            dataIndex: 'fieldName',
            key: 'fieldName',
            render:(text: any, record: any)=>{
                return(
                    <Input onInput={(value:any)=>{handleInputChange('fieldName', record, value)}}></Input>
                )
            }
        },
        {
            title: '字段类型',
            dataIndex: 'fieldType',
            key: 'fieldType',
            render:(text: any, record: any)=>{
                return (
                    <Select
                        showSearch
                        placeholder="Select a type"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={filedTypeOptions}
                        onChange={(value:any)=>{handleSelectChange('fieldType', record,value)}}
                        style={{width:'150px'}}
                    />
                    )
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_: any, record: any) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(_, record)}>
                        <a>删除</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleDelete = (val: any, record:any) => {
        // eslint-disable-next-line no-debugger
        const newData = dataSource.filter((item) => item.key !== record.key);
        setDataSource(newData);
    };
    const handleInputChange = (fieldName: string, record: DataType,value:any) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => item.key === record.key);
        if (index > -1) {
            const item = newData[index];
            if (fieldName === 'fieldName') {
                item.fieldName = value.target.value;
            }
            setDataSource(newData);
        }
    };

    const handleSelectChange = (fieldType: string, record: DataType,value:any) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => item.key === record.key);
        if (index > -1) {
            const item = newData[index];
            if (fieldType === 'fieldType') {
                item.fieldType = value;
            }
            setDataSource(newData);
        }
    };
    const handleAdd = () => {
        const newData = {
            key: dataSource.length + 1,
            fieldName: '',
            fieldType: '',
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const addTable = () => {
        let columns='id INT PRIMARY KEY AUTO_INCREMENT'+''
        dataSource.forEach(item=>{
            columns=`${columns},${item.fieldName} ${item.fieldType}`
        })
        const params={
            tableName: tableName,
            columnDefinitions: columns,
        }
        http.post('beans/tables/createTable',params).then(res=>{
            setAddTableVisible(false)
        })
    };
    const changeTableName =function (value:any) {
        setTableName(value.target.value)
    }
    return (
        <Modal
            open={addTableVisible}
            onCancel={() => {
                setAddTableVisible(false)
            }}
            onOk={addTable}
            width={700}
        >
            <div>
                <div style={{marginTop:'25px'}}>
                    表名：<Input style={{width:'200px'}} onChange={(value)=>{changeTableName(value)}}></Input>
                    <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, float:'right'}}>
                        新增
                    </Button>
                </div>
                <Table
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </div>
        </Modal>
    );
}
