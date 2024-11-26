import styles from './subLayout.module.css';
import { Menu } from 'antd';
import router from "../../../routers";
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom'

export function SubLayout() {
    // 尝试获取HomePage的子路由项，如果不存在则默认为空数组
    // const homePageChildren = (router.routes.find(item => item.path === "/HomePage")?.children || []).map(child => ({
    //     key: child.path?.replace(/^\//, '')||"", // 假设路径可以作为key，并去除开头的斜杠
    //     label: child.child?'':'', // 使用displayName或路径的最后一部分作为label，如果都没有则默认为'未知'
    // }));
    const location = useLocation();
    const defaultKeys: any[]=[]
    const key=location.pathname.split('/')[2]
    defaultKeys.push(key)
    const homePageChildren =router.routes.filter(item=>item.path === "/HomePage")[0].children
    const navigate = useNavigate();
    // 你也可以在这里定义静态菜单项，如果需要的话
    const staticItems = [
        {
            key: '1',
            label: '图片管理',
        },
        // ...其他静态菜单项
    ];

    // 如果你想将静态菜单项和从路由中获取的菜单项合并，你可以这样做
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const allItems = [...homePageChildren];
    const toRoute = function (val: any){
        navigate(val.path)
    }
    return (
        <div className={styles.layout}>
            <Menu mode="inline" defaultSelectedKeys={defaultKeys} > {/* 你可以根据需要调整Menu的属性 */}
                {allItems.map(item => (
                    <Menu.Item key={item.path} onClick={()=>{toRoute(item)}}>
                        {item.displayName}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
}
