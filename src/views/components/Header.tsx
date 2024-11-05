import './Header.css'
import { Button } from 'antd';
export default function Header(){
    return (
        <div className={'HeaderContainer'}>
            Header
            <div className={"buttonBody"}>
                <Button className={"buttonItem"} type="primary">
                    Click Me
                </Button>
                <Button className={"buttonItem"} type="primary">
                    Click Me
                </Button>
            </div>

        </div>
    )
};
