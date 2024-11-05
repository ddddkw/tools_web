// index.tsx
import "./publicPath";//导入上一步配置的文件，用于正确加载静态资源文件
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {createRoot} from "react-dom/client";

export async function bootstrap() {
    console.log("[react16] react app bootstraped");
}

export async function mount(props) {
    ReactDOM.render(
        <BrowserRouter
            basename={window.__POWERED_BY_QIANKUN__ ? "tools_web" : undefined}
        >
            <App />
        </BrowserRouter>,
        props.container
            ? props.container.querySelector("#root")
            : document.getElementById("root")
    );
}

export async function unmount(props) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(
        container
            ? container.querySelector("#root")
            : document.querySelector("#root")
    );
}
if (!window.__POWERED_BY_QIANKUN__) {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        throw new Error('Failed to find the root element');
    }

    const root = createRoot(rootElement);
    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>)
}
reportWebVitals();
