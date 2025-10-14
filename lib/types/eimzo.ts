import { PfxCertificate } from "../core/Certificate";

export interface HasApiKeys
{
    addApiKey: (domain: string, key: string) => void
}

export interface HasPfxPlugin 
{
    loadPfxCertificates: () => Promise<PfxCertificate[]>;
}

export enum EimzoErrorCodes {
    UNDEFINED_ERROR,

    UNDEFINED_VERSION,
    NOT_ACTUAL_VERSION,

    //PKCS7
    PASSWORD_ENTRY_CANCELED,
    SIGN_STRING_IS_EMPTY
    

}

export interface IEimzo extends HasApiKeys, HasPfxPlugin
{

}