import { useState, useEffect } from 'react';
import Store from './index';

// 封装一个自定义 Hook，用于订阅 Redux store 的变化
function subscribeHook() {
    const [update, setUpdate] = useState({});

    useEffect(() => {
        // 订阅 Redux store 的变化
        const unsubscribe = Store.subscribe(() => {
            // 调用 setUpdate 方法，触发组件的重新渲染
            setUpdate(prevUpdate => ({ ...prevUpdate }));
        });

        // 在组件卸载时取消订阅，避免内存泄漏
        return () => {
            unsubscribe();
        };
    }, []);

    // 返回一个空对象，以便在组件中使用
    return update;
}

export { subscribeHook };
