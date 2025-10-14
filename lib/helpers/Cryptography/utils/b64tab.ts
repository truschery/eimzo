export default function b64tab(bin: string) {
    const t = {}
    // @ts-ignore
    for (let i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i

    return t
}