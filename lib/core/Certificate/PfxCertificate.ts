import { Pfx } from "@truschery/eimzo-api";
import Alias from "./Alias";
import { isDate } from "../../helpers/predicates";
import {CertificateFile, CertificateLoadKeyAction, CertificateSignAction} from "../../types";

export default class PfxCertificate {

    fullName?: string;
    serialNumber?: string;
    name?: string;
    surname?: string;
    inn?: string;
    uid?: string;
    pinfl?: string;
    organization?: string;
    type?: string;
    validFrom?: Date;
    validTo?: Date;
    businesscategory?: string;
    address?: string;
    city?: string;

    file: CertificateFile;
    alias: string

    constructor(
        certificate: Pfx.Certificate,
        private signAction: CertificateSignAction,
        private loadKeyAction: CertificateLoadKeyAction
    ) {
        const alias = new Alias(certificate.alias)
        this.alias = certificate.alias
        this.file = {
            disk: certificate.disk,
            name: certificate.name,
            path: certificate.path
        }

        const validFrom = alias.get('validfrom') ?? new Date()
        const validTo = alias.get('validto') ?? new Date()

        this.fullName = alias.get('cn')
        this.serialNumber = alias.get('serialnumber')
        this.name = alias.get('name')
        this.surname = alias.get('surname')
        this.inn = alias.get('inn')
        this.uid = alias.get('uid')
        this.pinfl = alias.get('pinfl')
        this.organization = alias.get('o')
        this.type = alias.get('t')
        this.validFrom = new Date(validFrom)
        this.validTo = new Date(validTo)
        this.businesscategory = alias.get('businesscategory')
        this.address = alias.get('l')
        this.city = alias.get('st')
    }

    async sign(
        string: string,
        params?: any
    ): Promise<string>
    {
        return this.signAction(this, string, params)
    }

    loadKey()
    {
        return this.loadKeyAction(
            this.file.disk,
            this.file.path,
            this.file.name,
            this.alias
        )
    }

    isExpired(): boolean
    {
        return ! this.isValid()
    }

    isValid(): boolean
    {
        if(! isDate(this.validTo)) return false
        const now = Date.now()

        return this.validTo.getTime() >= now
    }

    isPhysical(): boolean
    {
        return this.inn === this.uid
    }

}