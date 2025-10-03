import Plugin from "../app/plugins/Plugin";
import { isEmpty, isEmptyArray } from "../helpers/validators";



export default class ConfigBuilder 
{

    plugins = []

    constructor(
        apiKey
    )
    {
        

        this.apiKey = apiKey
    }

    addPlugins(plugins)
    {
        if(isEmpty(plugins) || isEmptyArray(plugins)) throw new Error('Plugins is empty')

        if(Array.isArray(plugins))
        {
            plugins.forEach(plugin => {
                if(plugins instanceof Plugin){
                    this.plugins.push(plugin)
                }
            })
        }

        if(plugins instanceof Plugin){
            this.plugins.push(plugin)   
        }

        throw new Error('Plugin is not is plugin')
    }


}