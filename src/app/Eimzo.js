import ApiKeys from '../config/ApiKeys'
import EimzoCertificates from './modules/Certificates/EimzoCertificates'

export default class Eimzo 
{
    constructor(
        apiKeys
    )
    {
        new ApiKeys(apiKeys)
    }

    certificates()
    {
        return new EimzoCertificates()
    }
}