import _b64tab from "./utils/b64tab.js";
import cb_encode from "./utils/cb_encode.js";
import utob from "./utils/utob.js";
import btou from "./utils/btou.js";
import btoa from "./utils/btoa.js";


export default class Cryptography {

    b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    constructor() {
        this.b64tab = _b64tab(this.b64chars)
        this.atob = atob ? atob : this.localAtob

        this.Base64 = {
            VERSION: '2.1.4',
            atob: this.atob,
            btoa: this.btoa,
            fromBase64: this.decode,
            toBase64: this.encode,
            utob: utob,
            encode: this.encode,
            encodeURI: this.encodeURI,
            btou: btou,
            decode: this.decode,
            noConflict: this.noConflict,
        }

        if (typeof Object.defineProperty === 'function') {
            const noEnum = function(v){
                return { value: v, enumerable: false, writable: true, configurable: true }
            }
            this.Base64.extendString = () => {
                Object.defineProperty(
                    String.prototype, 'fromBase64', noEnum(() => {
                        return this.decode(this)
                    }))
                Object.defineProperty(
                    String.prototype, 'toBase64', noEnum( urisafe => {
                        return this.encode(this, urisafe)
                    }))
                Object.defineProperty(
                    String.prototype, 'toBase64URI', noEnum(() => {
                        return this.encode(this, true)
                    }))
            }
        }
    }

    encode(u, urisafe){
        const _encode = u => {
            return btoa(utob(u))
        }


        return !urisafe
            ? _encode(u)
            : _encode(u).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_'
            }).replace(/=/g, '')
    }

    decode(a){
        const _decode = () => {
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


    encodeURI(u){
        return this.encode(u, true)
    }

    localAtob(a){
        return a.replace(/[\s\S]{1,4}/g, this.localDecode)
    }

    localDecode(cccc){
        const fromCharCode = String.fromCharCode

        const len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? this.b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? this.b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? this.b64tab[cccc.charAt(2)] <<  6 : 0)
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