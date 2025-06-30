import errorCodes from "../config/error.config.js";

export default class Response {

    static NotFoundClass(name) {
        return {
            success: false,
            message: `Failed to find [${name}] class`
        }
    }

    static ErrorInMethod(name){
        return {
            success: false,
            message: `Error in [${name}] method`
        }
    }

    static ErrorCode(code){
        return {
            success: false,
            message: errorCodes[code],
            code: code,
        }
    }

    static Error(message){
        return {
            success: false,
            message: message
        }
    }

    static ThrowError(name){
        throw new Error(name)
    }

}