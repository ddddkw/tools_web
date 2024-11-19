import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import {message} from "antd";

const headers = {'Content-Type': 'application/json;charset=UTF-8'};
const alovaInstance = createAlova({
    // baseURL: '',

    requestAdapter: adapterFetch(),
    // 请求拦截器
    beforeRequest(){
        console.log(111)
    },
    // 返回拦截器
    responded: {
        onSuccess:async (response, methodInstance)=>{
            if (response.status >= 400) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            if (json.code !== 200) {
                message.error({
                    content: json.msg || '请求错误',
                    duration: 2000
                })
                // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
                throw new Error(json.message);
            }
            // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
            return json;
        },
        onError(error) {
            throw new Error(error)
        }
    }
});

const http = {
    get(url:string,params?:Record<string, any>) {
        return alovaInstance.Get(url,{
            headers,
            params
        })
    },
    post(url:string,params?:Record<any, any>){
        const defaultParams={
            uuid: new Date().getTime(),
            ...params
        }
        return alovaInstance.Post(url,defaultParams)
    }
}
export default http
