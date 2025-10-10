const apiKeys = new Map([
    ['localhost', 'localhost']
]);

export default class ApiKeys
{

    static addKey(domain: string, key: string): void
    {
        if(
            typeof domain !== 'string'
            || typeof key !== 'string'
        ){
            throw new Error('Domain Or Api Key Must Be a String')
        }

        apiKeys.set(domain, key)
    }

    static all(): unknown
    {
        return [...apiKeys]
    } 

}