import cb_utob from "./cb_utob.js";


export default function(u) {
    const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g

    return u.replace(re_utob, cb_utob)
}