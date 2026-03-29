import EimzoClient from "@truschery/eimzo-api";
import {EimzoErrorCodes, IEimzo} from '../types'
import {EimzoConfig} from "../config/interface";
import Config from "../config";
import PfxModule from "./modules/PfxModule";
import Pkcs7Module from "./modules/Pkcs7Module";
import EimzoError from "./EimzoError";
import {EimzoVersion} from "../types/eimzo";

export default class Eimzo implements IEimzo
{
    private readonly config: Config;
    private readonly client: EimzoClient;
    version?: EimzoVersion
    pfx: PfxModule;
    pkcs7: Pkcs7Module;

    constructor(config: EimzoConfig)
    {
        this.config = new Config(config);
        this.client = new EimzoClient
        this.pkcs7 = new Pkcs7Module(this.config, this.client)
        this.pfx = new PfxModule(this.config, this.client, this.pkcs7)

        if(this.config.getKeys().length > 0)
        {
            this.installApiKeys()
        }
    }

    async getVersion()
    {
        const data: any = await this.client.send({ name: 'version' })

        if(!data.major || !data.minor) throw new EimzoError('undefined E-IMZO version', EimzoErrorCodes.UNDEFINED_VERSION)

        this.version = {
            major: parseFloat(data.major),
            minor: parseFloat(data.minor),
            full: parseFloat(data.major) + '.' + parseFloat(data.minor)
        }

        return this.version
    }

    private installApiKeys()
    {
        const client = new EimzoClient
        client.onlySend({ name: 'apikey', arguments: this.config.getKeys() })
    }

}