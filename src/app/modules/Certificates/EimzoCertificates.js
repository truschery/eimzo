import { PfxPlugin } from '@truschery/eimzo-api'
import EimzoClient from '../../Eimzo/EimzoClient'
import { isEmpty, isEmptyArray } from '../../../helpers/validators'
import EimzoCertificate from './EimzoCertificate'
 
export default class EimzoCertificates
{
    certificates = []
    constructor()
    {
        this.pfx = new PfxPlugin(EimzoClient)
    }

    async load()
    {
        const result = await this.pfx.listAllCertificates()
        this.certificates = this.#parseCertificate(result?.certificates)

        return this.certificates;
    }


    #parseCertificate(certificates)
    {
        if(
            isEmpty(certificates) ||
            isEmptyArray(certificates)
        ){
            throw new Error('[Eimzo Certificates] Certificates Is Empty')
        }

        return certificates.map(certificate => {
            const eimzoCertificate = EimzoCertificate.fromAlias(certificate.alias)
            eimzoCertificate.file.disk = certificate.disk
            eimzoCertificate.file.name = certificate.name
            eimzoCertificate.file.path = certificate.path

            return eimzoCertificate
        })
    }
}