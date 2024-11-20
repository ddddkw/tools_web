import './index.css'
import {GetProp, message, Upload, UploadProps, Image, UploadFile} from "antd";
import {useEffect, useState} from "react";
import http from '../../../utils/request';
import {mount} from "../../../index";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function PlusOutlined() {
    return null;
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
    const [imageList, serImageList] = useState([])
    const queryList = () => {
        http.get('beans/image/queryImage')
            .then((res: any) => {
                serImageList(res.data)
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    };
    useEffect(()=>{
        queryList()
    })

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return(
        <div className={'imageBody'}>
            <Upload
                action="http://localhost:1023/beans/image/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
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
    )
}
