import { isEmpty } from "../helpers/Validators";
import ApiKey from "./ApiKey";

export default class EimzoConfig 
{

    static initialized = false
    
    static addApiKey(name, value)
    {
        
        ApiKey.add(name, value)

        return new self;
    }

    static apiKeys()
    {
        return [...apiKeys]
    } 
}