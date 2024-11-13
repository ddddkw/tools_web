import ComJson from '../views/mainPart/index'
import Store from "../store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getComById = (comId: string, comList: ComJson []): any => {
    const treeList = [...comList] || [...Store.getState().comList];

    for(let i=0; i<treeList.length; i++) {
        if(treeList[i].comId === comId) {
            return treeList[i]
        }else if(treeList[i].childList) {
            treeList.push(...(treeList[i].childList || []))
        }
    }
}
export {
    getComById
}
