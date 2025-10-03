
export default class Client
{
    socket          = null
    connected       = false

    constructor()
    {
    }

    get url()
    {
        const protocol = window.location.protocol.toLowerCase()
        const host = protocol === "https:" ? "wss://127.0.0.1:64443" : "ws://127.0.0.1:64646"

        return `${host}/service/cryptapi`
    }

    async connect()
    {
        if(this.connected) return Promise.resolve()
        return new Promise((resolve, reject) => {
            if (!window?.WebSocket) throw new Error(`Failed to find [WebSocket] class`)
            
            try {
                this.socket = new WebSocket(this.url)

                this.socket.onopen = () => {
                    console.log('Websocket open')
                    this.connected = true                    
                    resolve()
                }
            
                this.socket.onerror = e => {
                    console.log('Websocket error: ', e)
                    this.connected = false
                }

                this.socket.onclose = event => {
                    this.connected = false

                    if(e.code !== 1000){
                        throw new Error(`Failed connect to WebSocket. Error Code: ${e.code}`)
                    }
                }


            }catch (e){
                throw new Error(e.reason)
            }
        })
    }

    async send(data)
    {
        return new Promise(async (resolve, reject) => {
            if(!this.connected) await this.connect()

            if (this.socket.readyState !== WebSocket.OPEN) {
                reject(new Error('WebSocket not connected'))
                return
            }
            
            const handlerMessage = (event) => {
                const response = JSON.parse(event.data)
                
                this.socket.removeEventListener('message', handlerMessage)
                resolve(response)
            }

            this.socket.addEventListener('message', handlerMessage)

            this.socket.send(JSON.stringify(data))
        })
    }
}
