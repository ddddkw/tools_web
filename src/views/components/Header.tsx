import './Header.css'
import { Button, Modal, Form, Input } from 'antd';
import gitHub from '../../assets/github.png'
import { useNavigate } from 'react-router-dom';
import http from "../../utils/request";
import Store from "../../store";
import {useState} from "react";
export default function Header(props:any){
    const navigate = useNavigate();
    const {homePage} = props
    const [isSetPageName , setIsSetPageName] = useState(false)
    const [pageName , setPageName] = useState('')
    const toGitHub = function () {
        window.open('https://github.com/ddddkw/tools_web/')
    }
    const toHomePage=(()=>{
        navigate('/HomePage')
    })
    const addPage = () => {
        setIsSetPageName(true)
    };
    const changePageName = function (e:any) {
        setPageName(e.target.value)
    }
    const handleOk=function (){
        const comList = Store.getState().comList;
        http.post('beans/Pages/addPage',{pageName:pageName,pageJson: JSON.stringify(comList)})
            .then((res: any) => {
                console.log(111)
                setIsSetPageName(false)
                navigate('/HomePage')
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    }
    return (
        <div className={'HeaderContainer'}>
            <span className={'headerTitle'}>DD_builder</span>
            <div className={"buttonBody"}>
                {
                    !homePage?(
                        <>
                            <Button onClick={()=>{toHomePage()}} className={"buttonItem"} type="primary">
                                返回
                            </Button>
                            <Button className={"buttonItem"} type="primary">
                                刷新
                            </Button>
                            <Button onClick={addPage} className={"buttonItem"} type="primary">
                                保存
                            </Button>
                        </>
                    ):''
                }
                <img onClick={toGitHub} className={'gitHubIcon'} src={gitHub}/>
            </div>
            <Modal title="Basic Information" open={isSetPageName} onOk={handleOk} onCancel={()=>{setIsSetPageName(false)}}>
                <Form
                    name="basic"
                    labelCol={{ span:5 }}
                    wrapperCol={{ span: 19 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="页面名称"
                        name="页面名称"
                        rules={[{ required: true, message: '请输入页面名称!' }]}
                    >
                        <Input onChange={(e)=>{changePageName(e)}}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
