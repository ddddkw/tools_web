import BuildPage from '../../views/index'
import PreviewPage from '../../views/previewPage/index'
const buildRoutes=[
    {
        path:'/BuildPage',
        element:<BuildPage/>
    },
    {
        path:'/PreviewPage',
        element:<PreviewPage/>
    },
]
export {
    buildRoutes
}
