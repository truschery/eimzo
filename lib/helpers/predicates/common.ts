

export function isEmpty(v: unknown): v is null | undefined
{
    if (v === null || v === undefined || v === '')
        return true

    return (Array.isArray(v) && v.length === 0)
}

export function isNullOrUndefined(v: unknown): v is null | undefined
{
    return v === null || v === undefined
}

export function isDate(date: unknown): date is Date
{
    if(isEmpty(date)) return false

    return date instanceof Date
}