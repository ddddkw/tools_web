interface Window {
    nowCom: any; // 根据实际情况调整类型
    renderCom: any;
    comList: any;
    setComList: any
}
// 所有扩展名为 .png 的文件都是模块，返回类型为 string（即文件的 URL）
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
// src/types.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
