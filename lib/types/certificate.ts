import type { StringOrUndefined, DateOrUndefined } from "./common";
import {Pfx} from "@truschery/eimzo-api";


export namespace Certificate {

    export interface Instance extends Details
    {
        sign: (string: string, params: any) => Promise<string>
        loadKey: () => Promise<Pfx.LoadKeyResponse>
    }

    export interface Details
    {
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
    }



}