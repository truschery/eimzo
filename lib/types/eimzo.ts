


export type EimzoTimestamp = (signature_hex: string) => Promise<string>;

export interface EimzoConfig
{
    getTimestamp?: EimzoTimestamp,
    keys?: Record<string, string>,
    debug?: boolean,

}

export interface EimzoVersion {
    major: number,
    minor: number,
    full: string,
}

export enum EimzoErrorCodes {
    UNDEFINED_ERROR,

    UNDEFINED_VERSION,
    NOT_ACTUAL_VERSION,

    //PKCS7
    PASSWORD_ENTRY_CANCELED,
    SIGN_STRING_IS_EMPTY,
    TIMESTAMP_FAIL
}