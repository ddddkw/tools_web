import './App.css';
// import Main from './views/index.tsx'
import {Outlet, RouterProvider} from 'react-router-dom';
import router from "./routers";
import React from 'react';
import 'antd/dist/antd';

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}>
            {/* 应用的其他部分，如导航栏、布局组件等 */}
            <Outlet /> {/* Outlet 用于渲染当前匹配的路由组件 */}
        </RouterProvider>
    </div>
  );
}

export default App;
