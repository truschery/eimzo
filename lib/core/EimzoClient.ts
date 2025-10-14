import EimzoInstance from "@truschery/eimzo-api"
import type { BaseEimzoApiResponse } from '@truschery/eimzo-api'
import ApiKeys from "./ApiKeys";
import EimzoError from "./EimzoError";
import {EimzoErrorCodes} from "../types/eimzo";

class EimzoClient extends EimzoInstance
{
    constructor() {
        super()
    }

    readonly minEimzoVersion: number = 450

    async send<T extends BaseEimzoApiResponse>(data: object): Promise<T>
    {
        if(!this.isConnected)
        {
            await super.connect()
            await this.checkVersion()
            await this.installApiKeys(ApiKeys.all())
        }

        return super.send(data)
    }

    async checkVersion()
    {
        const data: any = await this.send({ name: 'version' })

        if(!data.major || !data.minor) throw new EimzoError('undefined E-IMZO version', EimzoErrorCodes.UNDEFINED_VERSION)

        const installedVersion = parseInt(data.major) * 100 + parseInt(data.minor)

        if(installedVersion <= this.minEimzoVersion){
            throw new EimzoError('E-IMZO version is not actual, please install 4.5 or more', EimzoErrorCodes.NOT_ACTUAL_VERSION)
        }
    }

    async installApiKeys(apiKeys: [string, string][])
    {
        return super.onlySend({ name: 'apikey', arguments: apiKeys })
    }
}

const eimzoClient = new EimzoClient()

export default eimzoClient