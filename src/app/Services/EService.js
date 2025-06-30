import {EClient} from "../Client/index.js";


export default class EService extends EClient{

    constructor(API_KEYS) {
        super(API_KEYS)

        this.certificates = []
    }

    async install(){
        await super.checkVersion()
        await super.installApiKeys()

        this.certificates = await super.getPfxCertificates()
    }

    sign(serialNumber, data, timestamper){
        return new Promise(async (resolve, reject) => {
            try {
                const certificate = this.certificates.find(key => key.serialNumber === serialNumber)

                if(!certificate) return false

                const loadedKey = await super.loadPfxKey(certificate)

                const pkcs7 = await super.createPkcs7(loadedKey.keyId, data, timestamper).catch(e => reject(e))

                resolve(pkcs7.pkcs7_64)
            }catch (e){
                reject(e)
            }
        })
    }


}