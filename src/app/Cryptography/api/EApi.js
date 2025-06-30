import Response from "../../../helpers/Response.js";


export default class EApi {

    constructor() {
        this.socket = null

        this.connect()
    }

    connect(){
        if (!window?.WebSocket) throw new Error(`Failed to find [WebSocket] class`)

        try {
            const url = this.getUrl()

            this.socket = new WebSocket(url)

            this.socket.onclose = e => {
                if(e.code !== 1000){
                    throw new Error(`Failed connect to WebSocket. Error Code: ${e.code}`)
                }
            }
        }catch (e){
            throw new Error(e.reason)
        }
    }

    send(data) {
        return new Promise((resolve, reject) => {

            this.socket.addEventListener('message', event => {
                const data = JSON.parse(event.data)

                resolve(data)
            })

            if(this.socket.readyState === WebSocket.OPEN){
                return this.socket.send(JSON.stringify(data))
            }

            this.socket.onopen = () => {
                this.socket.send(JSON.stringify(data))
            }
        })
    }

    async pkcs7(data64, id, detached){
        const response = await this.api({plugin: "pkcs7", name: "create_pkcs7", arguments: [data64, id, detached]})

        if(response.success) return response

        if(response.hasOwnProperty('reason') && response.reason.indexOf('javax.crypto.BadPaddingException') !== -1){
            return Promise.reject(Response.ErrorCode(1001))
        }else if(!response.success && response.reason.indexOf('Ввод пароля отменен') !== -1){
            return Promise.reject(Response.ErrorCode(1002))
        }
    }

    api(data){
        return this.send(data)
    }

    version() {
        return this.send({ name: 'version' })
    }

    apidoc() {
        return this.send({ name: 'apidoc' })
    }

    apikey(domainAndKey) {
        return this.send({ name: 'apikey', arguments: domainAndKey })
    }

    getUrl() {
        const protocol = window.location.protocol.toLowerCase()
        const host = protocol === "https:" ? "wss://127.0.0.1:64443" : "ws://127.0.0.1:64646"

        return `${host}/service/cryptapi`
    }

}