

export default class EimzoError extends Error {

    name: string = 'EimzoError'
    code: undefined|number
    message: string

    constructor(message: string, code: number) {
        super(message)
        Error.call(this)

        //@ts-ignore
        if(Error.captureStackTrace)
        {
            Error.captureStackTrace(this, this.constructor)
        }else{
            this.stack = (new Error()).stack
        }

        this.message = message
        this.code = code
    }

    data()
    {
        return {
            message: this.message,
            code: this.code
        }
    }

}