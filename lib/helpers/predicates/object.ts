import {isEmptyArray} from "./array";
import {isEmpty} from "./common";


export function isObject(obj: unknown): obj is { [key: string]: any }
{
    return obj !== null &&
        !!obj &&
        typeof obj === 'object' &&
        !Array.isArray(obj)
}

export function isEmptyObject(obj: object): boolean
{
    return JSON.stringify(obj) === '{}'
}

export function isEmptyObjectProperties(obj: object, properties: string[]): boolean
{
    if(
        !isObject(obj)
        || isEmptyObject(obj)
    ) return true

    if(isEmptyArray(properties)) return true

    const emptyProperties = properties.filter((property: string) => isEmpty(obj[property]))

    return emptyProperties.length > 0
}

export function isNotEmptyObjectProperties(obj: object, properties: string[]): boolean {
    return !isEmptyObjectProperties(obj, properties)
}