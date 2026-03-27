import {EimzoConfig, EimzoTimestamp} from "./interface";
import EimzoKey from "./EimzoKey";


export default class Config
{
    keys: Record<string, string> | undefined;
    getTimestamp: EimzoTimestamp | undefined;

    constructor(config: EimzoConfig) {
        this.setEimzoApiKeys(config)
        this.getTimestamp = config.getTimestamp;

        Object.freeze(this.keys);
        Object.freeze(this.getTimestamp);
        Object.freeze(this);
    }

    private setEimzoApiKeys(config: EimzoConfig)
    {
        this.keys = config.keys ?? {}

        if(config.debug){
            this.keys.localhost = 'localhost'
        }
    }

}