import EimzoClient from "@truschery/eimzo-api";
import Config from "../../config";


export default class Module
{
    config: Config;
    client: EimzoClient;

    constructor(
      config: Config,
      client: EimzoClient, // TODO[2603] Использовать объект от eimzo-api
    ) {
        this.config = config;
        this.client = client
    }
}