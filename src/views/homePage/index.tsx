import Header from "../components/Header";
// import Main from "./components/index";
import {SubLayout} from "./components/subLayout";
import './index.css'
import {Outlet} from "react-router-dom";
export function HomePage(){
    return(
        <div>
            <Header homePage={true}></Header>
            <div className={'homeBody'}>
                <SubLayout></SubLayout>
                <Outlet></Outlet>
                {/*<Main></Main>*/}
            </div>
        </div>
    )
}
