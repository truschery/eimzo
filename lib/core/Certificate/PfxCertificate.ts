import {Certificate, DateOrUndefined, StringOrUndefined} from "../../types";
import {isEmpty, isEmptyObjectProperties} from "../../helpers/predicates";
import Alias from "./Alias";
import EimzoClient from "../EimzoClient";
import { Pfx } from "@truschery/eimzo-api";
import { isBase64, isString, isDate } from "../../helpers/predicates";
import {Pkcs7} from "@truschery/eimzo-api";
import EimzoError from "../EimzoError";
import {EimzoErrorCodes} from "../../types/eimzo";

export default class PfxCertificate implements Certificate.Instance {

    fullName: StringOrUndefined;
    serialNumber: StringOrUndefined;
    name: StringOrUndefined;
    surname: StringOrUndefined;
    inn: StringOrUndefined;
    uid: StringOrUndefined;
    pinfl: StringOrUndefined;
    organization: StringOrUndefined;
    type: StringOrUndefined;
    validFrom: DateOrUndefined;
    validTo: DateOrUndefined;
    businesscategory: StringOrUndefined;
    address: StringOrUndefined;
    city: StringOrUndefined;

    file: any;
    alias: string

    constructor(certificate: Pfx.Certificate) {
        this.alias = certificate.alias
        this.file = {
            disk: certificate.disk,
            name: certificate.name,
            path: certificate.path
        }

        this.fromAlias()
    }

    fromAlias()
    {
        const alias = new Alias(this.alias)
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
        params: any
    ): Promise<string>
    {
        if(
            isEmpty(string) ||
            ! isString(string)
        ){
            throw new EimzoError('Invalid String Value Is Empty Or Not String', EimzoErrorCodes.SIGN_STRING_IS_EMPTY)
        }

        const base64 = isBase64(string) ? string : btoa(string)
        const loadedKey = await this.loadKey()
        const isDetached = params?.detached ? 'yes' : 'no'

        const signedString = await this.createPkcs7(base64, loadedKey.keyId, isDetached)

        return signedString.pkcs7_64
    }

    loadKey()
    {
        return EimzoClient.pfx.loadKey(
            this.file.disk,
            this.file.path,
            this.file.name,
            this.alias
        )
    }

    createPkcs7(base64: string, keyId: string, isDetached: Pkcs7.isDetached = 'no')
    {
        try {
            return EimzoClient.pkcs7.createPkcs7(
                base64,
                keyId,
                isDetached
            );
        } catch (error) {
            //@ts-ignore
            if (error.status === -5) {
                throw new EimzoError('Password Entry Canceled', EimzoErrorCodes.PASSWORD_ENTRY_CANCELED);
            }

            throw new EimzoError('Undefined Error creating Pkcs7', EimzoErrorCodes.UNDEFINED_ERROR);
        }
    }

    isExpired(): boolean
    {
        if(
            ! isDate(this.validTo)
        ){
            return false
        }

        return this.validTo.getTime() <= new Date().getTime();
    }

    isPhysical(): boolean
    {
        return this.inn === this.uid
    }

}