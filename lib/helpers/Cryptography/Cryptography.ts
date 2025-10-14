import {
    b64tab,
    localBtoa,
    utob,
    btou
} from "./utils";


export default class Cryptography {

    b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    b64tab = b64tab(this.b64chars)
    atob = !!atob ? atob : this.localAtob
    Base64: any

    constructor() {

        this.Base64 = {
            VERSION: '2.1.4',
            atob: this.atob,
            // btoa: btoa,
            fromBase64: this.decode,
            // toBase64: this.encode,
            utob: utob,
            // encode: this.encode,
            encodeURI: this.encodeURI,
            btou: btou,
            decode: this.decode,
            noConflict: this.noConflict,
        }

        if (typeof Object.defineProperty === 'function') {
            const noEnum = function(v: any){
                return { value: v, enumerable: false, writable: true, configurable: true }
            }
            // this.Base64.extendString = () => {
            //     Object.defineProperty(
            //         String.prototype, 'fromBase64', noEnum(() => {
            //             return this.decode(this)
            //         }))
            //     Object.defineProperty(
            //         String.prototype, 'toBase64', noEnum((urisafe: boolean) => {
            //             return this.encode(this, urisafe)
            //         }))
            //     Object.defineProperty(
            //         String.prototype, 'toBase64URI', noEnum(() => {
            //             return this.encode(this, true)
            //         }))
            // }
        }
    }

    static encode(u:any, urisafe?: boolean){
        const _encode = (u: string) => {
            // const btoaNew = !!btoa ? btoa : localBtoa
            return btoa(utob(u))
        }


        return !urisafe
            ? _encode(u)
            : _encode(u).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_'
            }).replace(/=/g, '')
    }

    decode(a: string){
        const _decode = (a: string) => {
            return btou(this.atob(a))
        }


        return _decode(
            a.replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, ''),
        )
    }

    noConflict() {
        return this.Base64
    }


    encodeURI(u: string){
        return Cryptography.encode(u, true)
    }

    localAtob(a: string){
        return a.replace(/[\s\S]{1,4}/g, this.localDecode)
    }

    localDecode(cccc: string){
        const fromCharCode = String.fromCharCode

        // @ts-ignore
        const len = cccc.length,
        padlen = len % 4,
            // @ts-ignore
        n = (len > 0 ? this.b64tab[cccc.charAt(0)] << 18 : 0)
            // @ts-ignore
            | (len > 1 ? this.b64tab[cccc.charAt(1)] << 12 : 0)
            // @ts-ignore
            | (len > 2 ? this.b64tab[cccc.charAt(2)] <<  6 : 0)
            // @ts-ignore
            | (len > 3 ? this.b64tab[cccc.charAt(3)]       : 0),
        chars = [
            fromCharCode( n >>> 16),
            fromCharCode((n >>>  8) & 0xff),
            fromCharCode( n         & 0xff),
        ]
        chars.length -= [0, 0, 2, 1][padlen]

        return chars.join('')
    }
}