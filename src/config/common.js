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

export const timestamp = (time,type)=>{
    if(type == 1) return new Date(time).getTime()
    else if(type == 2 || type == 4){
        let date = time ? new Date(time) : new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let min = date.getMinutes()
        let second = date.getSeconds()
        return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day) + (type == 4 ? (' ' + hour + ':' + (min < 10 ? ('0' + min) : min) + ':' + (second < 10 ? ('0' + second) : second)) : '')
    }else if(type == 3){
        return new Date(time).getDay()
    }
}

export const getTotalDays = (start,end)=>{
    let oneDay = (60 * 1000 * 24 * 60)
    let total_day = (timestamp(end,1) - timestamp(start,1)) / oneDay
    let days = []
    let time = timestamp(start,1)
    for(var i=0;i<=total_day;i++){
        if(i != 0) time = time + oneDay
        days.push({
            time: timestamp(time,2),
            week: timestamp(time,3) === 0 ? 7 : timestamp(time,3)
        })
    }
    return days
}

