import {configureStore} from '@reduxjs/toolkit'

// 暂时先用两个state，一个是comList，用来表示当前画布区的组件列表。一个是nowCom，用来表示从左侧拖拽组件的type（就是从左侧组件列表拖拽的组件）
const initialState  = { comList: [], dragCom: '', selectCom:''}

const comReducer = (state: any = initialState, action: any) => {
    // eslint-disable-next-line no-debugger
    console.log(action.value,'action.value')
    // 根据行为来进行相应的操作，直接返回修改后的state的值就是对state进行修改
    switch (action.type) {
        case 'changeNowCom': {
            return {...state, dragCom: action.value}
        }
        case 'changeComList': {
            return {...state, comList: action.value}
        }
        // 增加selectCom用来表示选中的节点
        case 'changeSelectCom': {
            return {...state, selectCom: action.value}
        }
        default: {
            return state
        }
    }
}


// 创建 store
const store = configureStore({
    reducer: comReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // 关闭序列化检查
    })
});
export default store;
