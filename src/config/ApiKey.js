import { isEmpty } from "../helpers/Validators";

const apiKeys = new Map([
    ['localhost', 'localhost']
]);

export default class ApiKey {

    static add(name, value)
    {
        if(isEmpty(name) || isEmpty(value)) return false
        if(apiKeys.has(name)) return false

        apiKeys.set(name, value)

        return new self
    }

    static all()
    {
        return [...apiKeys]
    } 

}