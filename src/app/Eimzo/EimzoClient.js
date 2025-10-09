import { Client } from '@truschery/eimzo-api'
import ApiKeys from '../../config/ApiKeys'

class EimzoClient extends Client
{

    minEimzoVersion = 450

    async send(data)
    {
        if(!super.connected)
        {
            await super.connect()
            super.connected = true
            await this.checkVersion()
            await this.installApiKeys(ApiKeys.all())
        }
        
        return super.send(data)
    }

    async checkVersion()
    {
        const data = await super.send({ name: 'version' })

        if(!data.success) throw new Error('[Eimzo Api] Eimzo is not installed')

        if(!data.major || !data.minor) throw new Error('[Eimzo Api] undefined E-IMZO version')

        const installedVersion = parseInt(data.major) * 100 + parseInt(data.minor)

        if(installedVersion <= this.minEimzoVersion){
            throw new Error('[Eimzo Api] E-IMZO version is not actual, please install 4.5 or more')
        }
    }
    
    async installApiKeys(apiKeys)
    {
        return super.onlySend({ name: 'apikey', arguments: apiKeys })
    }
}

const eimzoClient = new EimzoClient()

export default eimzoClient