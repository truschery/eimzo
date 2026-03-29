import Module from "./Module";
import {PfxCertificate} from "../Certificate";
import EimzoClient, {Pfx} from "@truschery/eimzo-api";
import {isEmpty, isEmptyArray} from "../../helpers/predicates";
import Pkcs7Module from "./Pkcs7Module";
import Config from "../../config";
import {Certificate} from "../../types";
import {PfxListOptions} from "./types";
import filterCertificates from "../../helpers/filterCertificates";

export default class PfxModule extends Module
{
    constructor(
        config: Config,
        client: EimzoClient,
        private pkcs7: Pkcs7Module
    ) {
        super(config, client);

    }


    private certificates: PfxCertificate[] = []

    async list(options?: PfxListOptions)
    {
        const result = await this.client.pfx.listAllCertificates()
        this.certificates = this.parseCertificate(result?.certificates)

        return filterCertificates(
          this.certificates,
          options
        );
    }

    private parseCertificate(certificates: Pfx.Certificate[])
    {
        if(
            isEmpty(certificates)
        ){
            throw new Error('[Eimzo Certificates] Certificates Is Empty')
        }

        return certificates.map(certificate => {
            return new PfxCertificate(
                certificate,
                (cert: Certificate, signableContent: string, params?: any) => this.pkcs7.sign(cert, signableContent, params),
                (disk: string, path: string, name: string, alias: string) => this.client.pfx.loadKey(
                    disk,
                    path,
                    name,
                    alias
                )
            )
        })
    }

}