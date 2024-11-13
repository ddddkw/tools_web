import { Rate as AntRate} from 'antd';
export default function Rate(props:any){
    const {allowClear,allowHalf,character,count,defaultValue,disabled}=props
    const number = Number(count||5)
    return (
        <AntRate allowClear={allowClear} allowHalf={allowHalf} character={character} count={number} defaultValue={defaultValue} disabled={disabled}></AntRate>
    )
}
