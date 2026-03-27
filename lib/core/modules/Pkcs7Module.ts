import Module from "./Module";
import {Certificate, EimzoErrorCodes} from "../../types";
import {isBase64, isEmpty} from "../../helpers/predicates";
import EimzoError from "../EimzoError";
import {Pkcs7} from "@truschery/eimzo-api";


export default class Pkcs7Module extends Module
{
    async sign(
        cert: Certificate,
        signableContent: string,
        params?: any,

    ) {
        if(
            isEmpty(signableContent)
        ){
            throw new EimzoError('Invalid String Value Is Empty Or Not String', EimzoErrorCodes.SIGN_STRING_IS_EMPTY)
        }

        const base64 = isBase64(signableContent) ? signableContent : btoa(signableContent)
        const loadedKey = await cert.loadKey()
        const isDetached = params?.detached ? 'yes' : 'no'

        const signedString = await this.createPkcs7(base64, loadedKey.keyId, isDetached)

        if(this.config.getTimestamp){
            try{
                return await this.config.getTimestamp(signedString.pkcs7_64);
            }catch(e){
                throw new EimzoError('An error occurred while generating the timestamp.', EimzoErrorCodes.TIMESTAMP_FAIL)
            }

        }

        return signedString.pkcs7_64
    }

    createPkcs7(base64: string, keyId: string, isDetached: Pkcs7.isDetached = 'no')
    {
        try {
            return this.client.pkcs7.createPkcs7(
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
}