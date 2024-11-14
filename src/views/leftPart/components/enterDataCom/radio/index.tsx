import {Radio as AntRadio} from 'antd'
export default function Radio(props:any) {
    const { disabled,checked,autoFocus,defaultChecked,indeterminate,label } = props;
    return(
        <div>
            <AntRadio disabled={disabled} checked={checked} autoFocus={autoFocus} defaultChecked={defaultChecked}>{label||'单选框'}</AntRadio>
        </div>
    )
}
