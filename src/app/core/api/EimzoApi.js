import Client from "../Client";
import ApiKeys from '../../../config/ApiKeys'

class EimzoApi extends Client
{
    minEimzoVersion = 450

    constructor()
    {
        super()
    }

    async checkVersion()
    {
        const data = await this.send({ name: 'version' })

        if(!data.success) throw new Error('Eimzo is not installed')

        if(!data.major || !data.minor) throw new Error('undefined E-IMZO version')

        const installedVersion = parseInt(data.major) * 100 + parseInt(data.minor)

        if(installedVersion <= this.minEimzoVersion){
            throw new Error('E-IMZO version is not actual, please install 4.5 or more')
        }
    }

    async installApiKeys()
    {
        return this.send({ name: 'apikey', arguments: ApiKeys.all() })
    }
}


const eimzoApi = new EimzoApi

export default eimzoApi