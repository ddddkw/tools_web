import './index.css'
import LeftPart from './leftPart/index'
import MainPart from './mainPart/index'
import RightPart from './rightPart/index'
import Header from "./components/Header";
export default function Main(){
    return (
        <div className="mainContainer">
            <div>
                <Header  homePage={false}/>
            </div>
            <div className={"bodyContainer"}>
                <LeftPart></LeftPart>
                <MainPart></MainPart>
                <RightPart></RightPart>
            </div>
        </div>
    )
}
