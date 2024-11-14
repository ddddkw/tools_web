import { Checkbox as AntCheckbox } from 'antd';
export default function Checkbox(props:any){
    const { disabled,checked,autoFocus,defaultChecked,indeterminate,label } = props;
    // 根据type来返回对应的Icon
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return(
        <div>
            <AntCheckbox disabled={disabled} checked={checked} autoFocus={autoFocus} defaultChecked={defaultChecked} indeterminate={indeterminate}>{label||'多选框'}</AntCheckbox>
        </div>
    )
}
