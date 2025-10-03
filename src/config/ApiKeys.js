import { isEmpty, isEmptyArray } from "../helpers/validators";

const apiKeys = new Map([
    ['localhost', 'localhost']
]);

export default class ApiKeys {

    constructor(keys)
    {
        if (isEmpty(keys) || isEmptyArray(keys)) throw new Error('ApiKeys is required')
        if(keys.length % 2 !== 0) throw new Error('ApiKey is not valid')
        
        this.installKeys(keys)
    }

    installKeys(keys)
    {
        
        for(let i = 0; i < keys.length; i+=2){
            let step = i
            const [site, api] = [keys[step], keys[++step]]
            apiKeys.set(site, api)
        }
    }

    static all()
    {
        return [...apiKeys]
    } 

}