import Header from "../components/Header";
import Main from "./components/index";
export function HomePage(){
    return(
        <div>
            <Header homePage={true}></Header>
            <Main></Main>
        </div>
    )
}
