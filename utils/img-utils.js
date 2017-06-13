/**
 * 图片裁剪、压缩并转化为jpg格式
 * @param {File} file 文件
 * @returns Promise<File>
 */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
export function imageCompress (file) {
    const reader = new FileReader();
    const sourceImage = new Image();
    const filename = file.name;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
        reader.onload = (event) => {
            sourceImage.src = event.target.result;

            sourceImage.onload= () => {
                console.log(sourceImage.width, sourceImage.height);
                let size = sourceImage.width < sourceImage.height ? sourceImage.width : sourceImage.height;
                canvas.width = size;
                canvas.height = size;
                ctx.drawImage(
                    sourceImage,
                    (sourceImage.width - size) / 2,
                    (sourceImage.height - size) / 2,
                    sourceImage.width,
                    sourceImage.height,
                    0,
                    0,
                    sourceImage.width,
                    sourceImage.height,
                );

                // setTimeout(() => {
                    let resultFile = dataURLtoBlob(canvas.toDataURL('image/jpeg', 0.5));
                    resultFile = new File([resultFile], 'temp.jpg', {
                        type: 'image/jpeg',
                    });
                    resolve(resultFile);
                // }, 1000);
            };
        };
    });
}