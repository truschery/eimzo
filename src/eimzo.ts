import type { IConfig } from './config/interface.js'

import Eimzo from './core/Eimzo.js'
import defaultConfig from './config/default.js'

function createEimzo(defaultConfig: IConfig): Eimzo
{
    const context = new Eimzo(defaultConfig)

    return context
}

const eimzo = createEimzo(defaultConfig)


export default eimzo