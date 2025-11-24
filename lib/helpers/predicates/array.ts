

export function isEmptyArray(arr: unknown): boolean
{
    return Array.isArray(arr) && arr.length === 0
}