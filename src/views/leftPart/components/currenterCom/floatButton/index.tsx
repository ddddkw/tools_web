import { FloatButton as AntFloatButton} from "antd";
export default function FloatButton(props:any) {
    const { comStyle, onClick, comId,caption,shape } = props
    return(
        <AntFloatButton
            shape={shape}
            style={{position:'absolute',...comStyle}}
        >{caption||'按钮'}</AntFloatButton>
    )
}
