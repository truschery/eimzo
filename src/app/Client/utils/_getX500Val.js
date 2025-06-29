import splitKeep from "./splitKeep.js";

export default function (s, f) {
    String.prototype.splitKeep = splitKeep

    const res = s.splitKeep(/,[A-Z]+=/g, true)
    for (let i in res) {
        const n = res[i].search((i > 0 ? "," : "") + f + "=")
        if (n !== -1) {
            return res[i].slice(n + f.length + 1 + (i > 0 ? 1 : 0))
        }
    }

    return ""
}