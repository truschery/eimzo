import EimzoAlias from '../../Eimzo/EimzoAlias'

export default class EimzoCertificates
{
    constructor(
        {
            fullName = null,
            serialNumber = null,
            name = null,
            surname = null,
            inn = null,
            uid = null,
            pinfl = null,
            organization = null,
            type = null,
            validFrom = null,
            validTo = null,
            businesscategory = null,
            address = null,
            city = null
        }
    )
    {
        this.fullName = fullName
        this.serialNumber = serialNumber
        this.name = name
        this.surname = surname
        this.inn = inn
        this.uid = uid
        this.pinfl = pinfl
        this.organization = organization
        this.type = type
        this.validFrom = validFrom
        this.validTo = validTo
        this.businesscategory = businesscategory
        this.address = address
        this.city = city

        this.file = {
            disk: null,
            name: null,
            path: null
        }
    }

    static fromAlias(aliasString)
    {
        const alias = new EimzoAlias(aliasString)

        return new this(
            {
                fullName: alias.get('cn'),
                serialNumber: alias.get('serialnumber'),
                name: alias.get('name'),
                surname: alias.get('surname'),
                inn: alias.get('inn'),
                uid: alias.get('uid'),
                pinfl: alias.get('pinfl'),
                organization: alias.get('o'),
                type: alias.get('t'),
                validFrom: alias.get('validfrom'),
                validTo: alias.get('validto'),
                businesscategory: alias.get('businesscategory'),
                address: alias.get('l'),
                city: alias.get('st')
            }
        )
    }

}