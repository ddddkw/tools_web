import {HomePage} from "../../views/homePage";
import {ImageManage} from "../../views/homePage/imageManage";
import {PageList} from "../../views/homePage/pageList";

const homeRoutes=[
    {
        path:'/HomePage',
        element: <HomePage/>,
        children:[
            {
                path:'PageList',
                element:<PageList/>,
                displayName:'页面管理'
            },
            {
                path:'ImageManage',
                element:<ImageManage/>,
                displayName:'图片管理'
            }
        ]
    },
    {
        path:'/',
        element:<HomePage/>
    }
]
export {
    homeRoutes
}
