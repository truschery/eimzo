import EApi from "../Cryptography/api/EApi.js";
import _getX500Val from "./utils/_getX500Val.js";
import isBase64 from "./utils/isBase64.js";
import { Cryptography } from "../Cryptography/index.js";
import ECertificate from "./ECertificate.js";


export default class EClient {

    constructor(API_KEYS) {
        if(!API_KEYS || !API_KEYS.length) return false

        this.NEW_API = false
        this.API_KEYS = API_KEYS
        this.cryptography = new Cryptography()

    }


    checkVersion() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await super.version()

                if(!data.success) return reject(data?.reason)

                if(!data.major || !data.minor) return reject('undefined E-IMZO version')

                const installedVersion = parseInt(data.major) * 100 + parseInt(data.minor)
                this.NEW_API = installedVersion >= 336

                return resolve({
                    major: data.major,
                    minor: data.minor
                })
            }catch (e){
                return reject(e?.reason)
            }
        })

    }

    installApiKeys() {
        return super.apikey(this.API_KEYS)
    }

    getPfxCertificates(){
        return new Promise(async (resolve, reject) => {
            const certificates = await this._findPfxs2()

            resolve(certificates)
        })
    }

    getFtjcCertificates() {
        return new Promise(async (resolve, reject) => {
            if(!this.NEW_API) return reject('Please install new version of E-IMZO')

            const pfxsData = await this._findPfxs2()
            const tokenData = await this._findTokens2()
            const firstKey = pfxsData.firstKey ?? tokenData.firstKey

            resolve({
                firstKey,
                keys: pfxsData.keys
            })
        })
    }

    loadPfxKey(certificate, verifyPassword){
        return new Promise(async (resolve ,reject) => {
            if( !certificate
                || !certificate.hasOwnProperty('disk')
                || !certificate.hasOwnProperty('path')
                || !certificate.hasOwnProperty('name')
                || !certificate.hasOwnProperty('alias')
            ) {
                reject('Certificate is invalid')
            }

            try {
                const key = await super.api({
                    plugin: "pfx",
                    name: "load_key",
                    arguments: [
                        certificate.disk,
                        certificate.path,
                        certificate.name,
                        certificate.alias
                    ],
                })

                if(!!verifyPassword){
                    const verifyKey = await super.api({ name: "verify_password", plugin: "pfx", arguments: [key] })

                    resolve(verifyKey)
                }

                resolve(key)
            }catch (e){
                reject(e.reason)
            }
        })

    }

    createPkcs7(id, data, timestamper, isDetached){
        return new Promise(async (resolve, reject) => {
            let data64 = isBase64(data) ? data : this.cryptography.encode(data)
            let detached = !!isDetached ? 'yes' : 'no'

            const pkcs7 = await super.pkcs7(data64, id, detached).catch(e => reject(e))

            if(!timestamper) return resolve(pkcs7)

            const sn = pkcs7.signer_serial_number
            timestamper(pkcs7.signature_hex, async tst => {
                const pkcs7tst = await super.api({plugin:"pkcs7", name:"attach_timestamp_token_pkcs7", arguments:[pkcs7, sn, tst]}).catch(e => reject(e.reason))

                resolve(pkcs7tst)
            })
        })

    }

    async _findPfxs2(){
        const data = await super.api({plugin: "pfx", name: "list_all_certificates"})

        let certificates = []
        for (let index in data.certificates) {
            const el = data.certificates[index]
            const certificate = new ECertificate(el)
            const key = certificate.getKey()

            if (!key.TIN && !key.PINFL)
                continue

            certificates.push(key)
        }

        return certificates
    }

    async _findTokens2(success, fail) {
        const data = await super.api({ plugin: "ftjc", name: "list_all_keys", arguments: [''] })

        let keys = []
        let itmkey
        for (let rec in data.tokens) {
            const el = data.tokens[rec]
            let x500name_ex = el.info.toUpperCase()
            x500name_ex = x500name_ex.replace("1.2.860.3.16.1.1=", "INN=")
            x500name_ex = x500name_ex.replace("1.2.860.3.16.1.2=", "PINFL=")

            // TODO: Сделать отдельный класс для этого функционала
            const key = {
                cardUID: el.cardUID,
                statusInfo: el.statusInfo,
                ownerName: el.ownerName,
                info: el.info,
                serialNumber: _getX500Val(x500name_ex, "SERIALNUMBER"),
                validFrom: new Date(_getX500Val(x500name_ex, "VALIDFROM")),
                validTo: new Date(_getX500Val(x500name_ex, "VALIDTO")),
                CN: _getX500Val(x500name_ex, "CN"),
                TIN: (_getX500Val(x500name_ex, "INN") ? _getX500Val(x500name_ex, "INN") : _getX500Val(x500name_ex, "UID")),
                UID: _getX500Val(x500name_ex, "UID"),
                PINFL: _getX500Val(x500name_ex, "PINFL"),
                O: _getX500Val(x500name_ex, "O"),
                T: _getX500Val(x500name_ex, "T"),
                type: 'ftjc',
            }
            if (!key.TIN && !key.PINFL)
                continue
            itmkey = "itm-" + key.serialNumber + "-" + rec

            keys.push(key)
        }

        return {
            firstKey: itmkey,
            keys
        }
    }



}