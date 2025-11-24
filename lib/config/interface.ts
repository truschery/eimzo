import { List } from '../types'

export type TConfigProperty = List

export interface IConfig
{
    default?: TConfigProperty
}

export interface Configurable
{

    merge: (configuration: TConfigProperty) => boolean;
    get: (property: string) => any;
}