export default function (bin) {
    var t = {}
    for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i

    return t
}