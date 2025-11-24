import {Configurable, IConfig, TConfigProperty} from './interface.js'
import { isEmptyObject } from '../helpers/predicates'
import {NullOrUndefined} from "../types";

/**
 * Основная логика класса конфигурации
 *
 * - Установка по умолчанию значений
 * - Продумать логику взаимодействия с конфигурацией
 * -
 */

export default class Config implements Configurable
{
    private defaultConfig: Map<string, any> = new Map()
    private config: Map<string, any> = new Map()

    constructor(configuration: IConfig)
    {
        this.setConfig(configuration.default)
    }

    merge(externalConfiguration: TConfigProperty): boolean
    {
        if(
            ! externalConfiguration ||
            ! isEmptyObject(externalConfiguration)
        ) {
            return false
        }

        // ...

        return true
    }

    get(property: string): any
    {
        return this.config.get(property)
    }


    private setConfig(configuration: NullOrUndefined|TConfigProperty)
    {
        if(
            ! configuration ||
            ! isEmptyObject(configuration)
        ) {
            return false
        }

        for(let key in configuration){
            this.defaultConfig.set(key, configuration[key])
            this.config.set(key, configuration[key])
        }
    }
}