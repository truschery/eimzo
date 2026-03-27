import EimzoClient from "../EimzoClient";
import Config from "../../config/Config";


export default class Module
{
    config: Config;
    client: typeof EimzoClient;

    constructor(
      config: Config,
      client: typeof EimzoClient, // TODO[2603] Использовать объект от eimzo-api
    ) {
        this.config = config;
        this.client = client
    }
}