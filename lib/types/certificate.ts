import type { StringOrUndefined, DateOrUndefined } from "./common";
import {Pfx, Pkcs7} from "@truschery/eimzo-api";

export interface CertificateFile
{
    disk: string,
    path: string,
    name: string,
}

export type CertificateSignAction = (cert: Certificate, signableContent: string, params?: any) => Promise<string>;

export interface Certificate {
    file: CertificateFile,
    alias: string,

    sign: (string: string, params: any) => Promise<string>
    loadKey: () => Promise<Pfx.LoadKeyResponse> // TODO[2703]: Сделать интерфейс абстрактнымм
    isExpired: () => boolean
    isValid: () => boolean
    isPhysical: () => boolean
}
