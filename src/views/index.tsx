import styles from './index.module.css'
import LeftPart from './leftPart/index'
import MainPart from './mainPart/index'
import RightPart from './rightPart/index'
import Header from "./components/Header";
export default function Main(){
    return (
        <div className={styles.mainContainer}>
            <div>
                <Header  homePage={false}/>
            </div>
            <div className={styles.bodyContainer}>
                <LeftPart></LeftPart>
                <MainPart></MainPart>
                <RightPart></RightPart>
            </div>
        </div>
    )
}
