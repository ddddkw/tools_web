import styles from './index.module.css'
import {GetProp, message, Upload, UploadProps, Image, UploadFile} from "antd";
import {useEffect, useState} from "react";
import http from '../../../utils/request';
import {blobToBase64Url} from '../../../utils/fileUtils'
import type { UploadChangeParam } from 'antd/lib/upload';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function PlusOutlined() {
    return null;
}
interface imageMap{
    id:any,
    name:string,
    image:any
}
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export function ImageManage(){
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const queryList = () => {
        http.get('beans/image/queryImage').send(true)
            .then((res: any) => {
                // 注意此处为什么要使用promise
                const modalList = res.data.map((item: { image: any; })=>{
                    return { ...item, thumbUrl:`data:image/jpeg;base64,${item.image}`,preview: `data:image/jpeg;base64,${item.image}` };
                })
                console.log(modalList,'modalList')
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setFileList(modalList);
                console.log(fileList,'fileList')
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    };
    useEffect(()=>{
        queryList()
    }, [])

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange = ({ file, fileList, event }: UploadChangeParam<UploadFile<any>>) => {
        setFileList(fileList)
        if (file.status==='done') {
            queryList()
        }
    };
    const removeImage = function (val:any){
        http.get(`beans/image/deleteImage?id=${val.id}`).send(true)
            .then(res=>{
                queryList()
            })
    }
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return(
        <div className={styles.imageBody}>
            <div className={styles.newImages}>
                <Upload
                    action="http://www.peaceandlove.asia/beans/image/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={removeImage}
                >
                    {uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </div>
        </div>
    )
}
