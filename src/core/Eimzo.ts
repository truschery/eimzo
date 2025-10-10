
import ApiKeys from './ApiKeys/ApiKeys.js'
import type { IEimzo } from './interface.js'
import PfxModule from './modules/pfx/index.js'

export default class Eimzo implements IEimzo
{
    pfx: unknown = null

    constructor(config: any)
    {
        this.#registerModules()   
    }

    addApiKey(domain: string, key: string)
    {
        ApiKeys.addKey(domain, key)
    }

    #registerModules()
    {
        this.pfx = new PfxModule()
    }
}