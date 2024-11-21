const blobToBase64Url = function (blob:any) {
    return new Promise((resolve, reject) => {
        const myBlog = new Blob([blob]);
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(myBlog);
    });
}
export {
    blobToBase64Url
}
