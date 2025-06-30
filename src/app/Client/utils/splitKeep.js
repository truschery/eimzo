export default function (splitter, ahead) {
    const self = this
    const result = []
    if (!splitter) {
        // Substitution of matched string
        function getSubst(value) {
            const substChar = value[0] === '0' ? '1' : '0'
            let subst = ''
            for (let i = 0; i < value.length; i++) {
                subst += substChar
            }

            return subst
        }
        const matches = []

        // Getting mached value and its index
        const replaceName = splitter instanceof RegExp ? "replace" : "replaceAll"
        const r = self[replaceName](splitter, function (m, i, e) {
            matches.push({ value: m, index: i })

            return getSubst(m)
        })

        // Finds split substrings
        let lastIndex = 0
        for (let i = 0; i < matches.length; i++) {
            const m = matches[i]
            const nextIndex = ahead == true ? m.index : m.index + m.value.length
            if (nextIndex !== lastIndex) {
                const part = self.substring(lastIndex, nextIndex)
                result.push(part)
                lastIndex = nextIndex
            }
        }

        if (lastIndex < self.length) {
            const part = self.substring(lastIndex, self.length)
            result.push(part)
        }

    } else {
        result.push(self)
    }

    return result
}