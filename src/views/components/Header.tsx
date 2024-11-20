import './Header.css'
import { Button } from 'antd';
import gitHub from '../../assets/github.png'
import { useNavigate } from 'react-router-dom';
import http from "../../utils/request";
export default function Header(props:any){
    const navigate = useNavigate();
    const {homePage} = props
    const addForm = {
        name:'',
        image:''
    }
    const toGitHub = function () {
        window.open('https://github.com/ddddkw/tools_web/')
    }
    const toHomePage=(()=>{
        navigate('/HomePage')
    })
    const addPage = () => {
        http.post('beans/pages/addPage',addForm)
            .then((res: any) => {
                console.log(111)
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    };
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
        </div>
    )
}
