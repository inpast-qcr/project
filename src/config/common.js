import JSEncrypt from "jsencrypt"

export const getEncryptCode = (param) => {
    let public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpu2kryFOuOBGUM40teBQC56y6MxsOLFefai8Omm6gbj3R3+opte7QztUupq5aHuUUzxPFqaURpCRW5JFvkEL7cQXT7/fW4j3yNSTUqkzE/22+7ou1AiQ0jFJUVNthuvOixkSW9iys+Tb0lpncp3/CUooNrjf86VIbPJEH2tnpswIDAQAB"

    let encryptParam = new JSEncrypt()
    encryptParam.setPublicKey(public_key)
    return encryptParam.encrypt(param.toString())
}