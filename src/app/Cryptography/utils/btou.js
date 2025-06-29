const re_btou = new RegExp([
    '[\xC0-\xDF][\x80-\xBF]',
    '[\xE0-\xEF][\x80-\xBF]{2}',
    '[\xF0-\xF7][\x80-\xBF]{3}',
].join('|'), 'g')

const cb_btou = function(cccc) {
    const fromCharCode = String.fromCharCode

    switch(cccc.length) {
        case 4:
            const cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    |    ((0x3f & cccc.charCodeAt(1)) << 12)
                    |    ((0x3f & cccc.charCodeAt(2)) <<  6)
                    |     (0x3f & cccc.charCodeAt(3)),
                offset = cp - 0x10000

            return (fromCharCode((offset  >>> 10) + 0xD800)
                + fromCharCode((offset & 0x3FF) + 0xDC00))
        case 3:
            return fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                |  (0x3f & cccc.charCodeAt(2)),
            )
        default:
            return  fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                |  (0x3f & cccc.charCodeAt(1)),
            )
    }
}

export default function (b) {
    return b.replace(re_btou, cb_btou)
}