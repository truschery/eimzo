import {Callback} from "../types/common";
import EimzoKey from "./EimzoKey";


export type EimzoTimestamp = (signature_hex: string) => Promise<string>;

export interface EimzoConfig
{
    getTimestamp?: EimzoTimestamp,
    keys?: Record<string, string>,
    debug?: boolean,

}