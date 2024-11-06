import './Header.css'
import { Button } from 'antd';
import gitHub from '../../assets/github.png'
export default function Header(){
    const toGitHub = function () {
        window.open('https://github.com/ddddkw/tools_web/')
    }
    return (
        <div className={'HeaderContainer'}>
            Dbulider
            <div className={"buttonBody"}>
                <Button className={"buttonItem"} type="primary">
                    Click Me
                </Button>
                <Button className={"buttonItem"} type="primary">
                    Click Me
                </Button>
                <img onClick={toGitHub} className={'gitHubIcon'} src={gitHub}></img>
            </div>

        </div>
    )
}
