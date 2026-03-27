import { PfxCertificate } from "../core/Certificate";
import PfxModule from "../core/modules/PfxModule";

export interface EimzoClient {

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

export interface IEimzo
{
    pfx: PfxModule;
}