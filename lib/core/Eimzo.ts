
import ApiKeys from './ApiKeys.js'
import type { IEimzo } from '../types'
import EimzoClient from './EimzoClient.js'
import {isEmpty, isEmptyArray} from "../helpers/predicates";
import { PfxCertificate } from "./Certificate";
import {Pfx} from "@truschery/eimzo-api";

export default class Eimzo implements IEimzo
{
    certificates: PfxCertificate[] = []

    constructor()
    {

    }

    addApiKey(domain: string, key: string)
    {
        ApiKeys.addKey(domain, key)
    }

    async loadPfxCertificates(): Promise<PfxCertificate[]>
    {
        const result = await EimzoClient.pfx.listAllCertificates()
        this.certificates = this.parseCertificate(result?.certificates)

        return this.certificates
    }

    private parseCertificate(certificates: Pfx.Certificate[])
    {
        if(
            isEmpty(certificates) ||
            isEmptyArray(certificates)
        ){
            throw new Error('[Eimzo Certificates] Certificates Is Empty')
        }

        return certificates.map(certificate => {
            return new PfxCertificate(certificate)
        })
    }

}