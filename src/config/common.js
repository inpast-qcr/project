import JSEncrypt from "jsencrypt"

export const getEncryptCode = (param) => {
    let public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpu2kryFOuOBGUM40teBQC56y6MxsOLFefai8Omm6gbj3R3+opte7QztUupq5aHuUUzxPFqaURpCRW5JFvkEL7cQXT7/fW4j3yNSTUqkzE/22+7ou1AiQ0jFJUVNthuvOixkSW9iys+Tb0lpncp3/CUooNrjf86VIbPJEH2tnpswIDAQAB"

    let encryptParam = new JSEncrypt()
    encryptParam.setPublicKey(public_key)
    return encryptParam.encrypt(param.toString())
}


//下载
export const downFile = (res, filename)=>{
    var blob = new Blob([res], {
        type: res.type
    }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = filename; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对
}