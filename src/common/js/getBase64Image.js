
/**
 * @file: Describe the file
 * @author: sunchao15@baidu.com 
 * @Date: 2019-04-17 14:15:24 
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-17 14:39:06
 */

export default function (file) {
    const blob = new Blob([file]); // 文件转化成二进制文件
    const img = URL.createObjectURL(blob);

    let image = new Image();
    image.crossOrigin = '';
    image.src = img;
    return new Promise((resolve, reject) => {
        image.onload = function () {
            resolve(getBase64Image(image));
        }
    })
}


function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    let dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}
