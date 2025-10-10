export default class ECertificate {

    alias = null
    serialNumber = null
    validFrom = null
    validTo = null
    CN = null
    TIN = null
    UID = null
    PINFL = null
    O = null
    T = null
    type = null

    constructor(certificate) {
        this.certificate = certificate
        this.disk = this.certificate.disk
        this.path = this.certificate.path
        this.name = this.certificate.name
        this.type = 'pfx'
        this.defaultAlias = this.certificate.alias


        this.parse()
    }

    parse(){
        let alias = this.certificate.alias.toUpperCase()
        alias = alias.replace("1.2.860.3.16.1.1=", "INN=")   // Замена на ИНН
        alias = alias.replace("1.2.860.3.16.1.2=", "PINFL=") // Замена на ПИНФЛ

        this.alias = alias
        this.aliasSplitted = alias.split(',')
        this.install()
    }

    install(){
        this.serialNumber = this.getFromAlias('SERIALNUMBER').value
        this.CN = this.getFromAlias('CN').value
        this.TIN = this.getFromAlias('TIN').value
        this.UID = this.getFromAlias('UID').value
        this.PINFL = this.getFromAlias('PINFL').value
        this.O = this.getFromAlias('O').value
        this.T = this.getFromAlias('T').value
        this.validFrom = new Date(this.getFromAlias('VALIDFROM').value)
        this.validTo = new Date(this.getFromAlias('VALIDTO').value)

    }

    getKey(){
        return {
            disk: this.disk,
            path: this.path,
            name: this.name,
            alias: this.defaultAlias,
            serialNumber: this.serialNumber,
            validFrom: this.validFrom,
            validTo: this.validTo,
            CN: this.CN,
            TIN: this.TIN,
            UID: this.UID,
            PINFL: this.PINFL,
            O: this.O,
            T: this.O,
            type: this.type,
        }
    }

    getFromAlias(key){
        const findAliasProperty = this.aliasSplitted.find(aliasSplit => aliasSplit.indexOf(key) !== -1)

        // console.log(this.aliasSplitted)
        if(!findAliasProperty) return false

        const [property, value] = findAliasProperty.split("=")

        return {
            property,
            value
        }
    }

}