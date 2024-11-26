import Header from "../components/Header";
// import Main from "./components/index";
import {SubLayout} from "./components/subLayout";
import styles from './index.module.css'
import {Outlet} from "react-router-dom";
export function HomePage(){
    return(
        <div>
            <Header homePage={true}></Header>
            <div className={styles.homeBody}>
                <SubLayout></SubLayout>
                <Outlet></Outlet>
                {/*<Main></Main>*/}
            </div>
        </div>
    )
}
