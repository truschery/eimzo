
export interface HasApiKeys
{
    addApiKey: (domain: string, key: string) => void
}

export enum EimzoErrorCodes {
    UNDEFINED_ERROR,

    UNDEFINED_VERSION,
    NOT_ACTUAL_VERSION,

    //PKCS7
    PASSWORD_ENTRY_CANCELED

}

export interface IEimzo extends HasApiKeys
{

}