import './Header.css'
import { Button } from 'antd';
import gitHub from '../../assets/github.png'
import { useNavigate } from 'react-router-dom';
export default function Header(props:any){
    const navigate = useNavigate();
    const {homePage} = props
    const toGitHub = function () {
        window.open('https://github.com/ddddkw/tools_web/')
    }
    const toHomePage=(()=>{
        navigate('/HomePage')
    })
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
                            <Button className={"buttonItem"} type="primary">
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
