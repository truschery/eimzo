import { isEmpty } from "../helpers/Validators";

const apiKeys = new Map();

export default class ApiKey {

    static initialized = false

    static add(name, value)
    {
        if(isEmpty(name) || isEmpty(value)) return false
        if(apiKeys.has(name)) return false

        self.initialized = true

        apiKeys.set(name, value)

        return new self
    }

    static all()
    {
        return [...apiKeys]
    } 

}