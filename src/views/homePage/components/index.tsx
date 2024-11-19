import './index.css';
import { Divider, Input, Button, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import http from '../../../utils/request';

const { Search } = Input;

export default function Main() {
    const navigate = useNavigate();
    let dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const onSearch = () => {
        console.log(111);
    };

    const toAdd = () => {
        navigate('/BuildPage');
    };

    const queryList = () => {
        http.post('')
            .then((res: any) => {
                dataList = res.data;
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    };

    const previewPage = (val: any) => {
        navigate(`/BuildPage?preview=${val}`);
    };

    const editPage = (val: any) => {
        navigate(`/BuildPage?edit=${val}`);
    };

    return (
        <div className={'homeContainer'}>
            <div className={'searchItem'}>
                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />&nbsp;&nbsp;
                <Button onClick={toAdd}>新建页面</Button>
            </div>
            <Divider />
            <div className={'pageBody'}>
                {dataList.map((item) => (
                    <Card key={item} className={'pageItem'} title="Default size card" extra={<DeleteOutlined />}>
                        <Button onClick={() => previewPage(item)}>预览页面</Button>&nbsp;&nbsp;
                        <Button onClick={() => editPage(item)}>编辑页面</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
