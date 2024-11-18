import './Header.css'
import { Button } from 'antd';
import gitHub from '../../assets/github.png'
export default function Header(){
    const toGitHub = function () {
        window.open('https://github.com/ddddkw/tools_web/')
    }
    return (
        <div className={'HeaderContainer'}>
            <span className={'headerTitle'}>DD_builder</span>
            <div className={"buttonBody"}>
                <Button className={"buttonItem"} type="primary">
                    刷新
                </Button>
                <Button className={"buttonItem"} type="primary">
                    保存
                </Button>
                <img onClick={toGitHub} className={'gitHubIcon'} src={gitHub}></img>
            </div>

        </div>
    )
}
