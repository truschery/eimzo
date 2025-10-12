
export default class Alias
{
    providedAlias: string
    alias: Map<string, string> = new Map()

    constructor(alias: string)
    {
        alias = alias.toUpperCase()
        alias = alias.replace("1.2.860.3.16.1.1=", "INN=")   // Замена на ИНН
        alias = alias.replace("1.2.860.3.16.1.2=", "PINFL=")
        this.providedAlias = alias.toUpperCase()
        this.parse(this.providedAlias)
    }

    private parse(providedAlias: string)
    {
        const splitted = providedAlias.split(',')

        splitted.forEach(alias => {
            const [field, value] = alias.split('=')
            this.alias.set(field.toLowerCase(), value)
        });
    }

    get(field: string, defaultValue?: string): undefined | string
    {
        if(!this.alias.has(field)) return defaultValue
        return this.alias.get(field)
    }
}