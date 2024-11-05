import { useState, useEffect } from 'react'
import Store from './index'
// 将组件的信息保存在redux中，当redux里面的内容发生改变时，在使用redux的地方就需要更新，所以我们封装一个自定义HOOK，作为当redux数据发生改变时，更新对应的组件
function subscribeHook() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [update, setUpdate] = useState<any>({})

    //  Redux 提供的方法，用于订阅 store 的变化
    useEffect(() => {
        // Store.subscribe是Redux提供的方法，用于订阅store的变化。store变化后会触发回调函数
        Store.subscribe(() => {
            // 调用setUpdate方法，会触发组件的重新渲染
            setUpdate({...update})
        })
    }, [])
}

export {
    subscribeHook
}
