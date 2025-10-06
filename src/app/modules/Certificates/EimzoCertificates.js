import { PfxPlugin } from '@truschery/eimzo-api'
import EimzoClient from '../../Client/EimzoClient'

export default class EimzoCertificates
{
    certificates = []
    constructor()
    {
        this.api = new PfxPlugin(EimzoClient)
    }

    async load()
    {
        const certificates = await this.api.listAllCertificates()

        console.log(certificates)

        return 1
    }


}