import ApiKeys from "../config/ApiKeys"
import eimzoApi from "./core/api/EimzoApi"

export default class Eimzo 
{
    minEimzoVersion = 450
    client = eimzoApi

    constructor(
        apiKeys
    )
    {
        new ApiKeys(apiKeys)
        
        eimzoApi.checkVersion()
        .then(() => eimzoApi.installApiKeys())
        
    }

    

    async getPfxList()
    {
        const value = await eimzoApi.send({plugin: "pfx", name: "list_all_certificates"})

        console.log(value);
        

        return []
    }

    

}