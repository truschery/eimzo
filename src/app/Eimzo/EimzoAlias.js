
export default class EimzoAlias
{

    providedAlias
    alias = {}
    
    constructor(alias)
    {
        if(typeof alias !== 'string'){
            throw new Error('[EimzoAlias] Invalid Alias String')
        }   
        alias = alias.toUpperCase()
        alias = alias.replace("1.2.860.3.16.1.1=", "INN=")   // Замена на ИНН
        alias = alias.replace("1.2.860.3.16.1.2=", "PINFL=")
        this.providedAlias = alias.toUpperCase()
        this.#parse(this.providedAlias)
    }

    #parse(providedAlias)
    {
        const splitted = providedAlias.split(',')
        
        splitted.forEach(alias => {
            const [field, value] = alias.split('=')
            this.alias[field.toLowerCase()] = value
        });
    }

    get(field)
    {
        return this.alias[field]
    }
}