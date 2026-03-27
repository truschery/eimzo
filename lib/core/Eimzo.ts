
import ApiKeys from './ApiKeys.js'
import type { IEimzo } from '../types'
import EimzoClient from './EimzoClient.js'
import {isEmpty, isEmptyArray} from "../helpers/predicates";
import { PfxCertificate } from "./Certificate";
import {Pfx} from "@truschery/eimzo-api";
import {EimzoConfig} from "../config/interface";
import Config from "../config/Config";
import PfxModule from "./modules/PfxModule";
import Pkcs7Module from "./modules/Pkcs7Module";

export default class Eimzo implements IEimzo
{
    private readonly config: Config;
    pfx: PfxModule;
    pkcs7: Pkcs7Module;

    constructor(config: EimzoConfig)
    {
        this.config = new Config(config);
        this.pkcs7 = new Pkcs7Module(this.config, EimzoClient)
        this.pfx = new PfxModule(this.config, EimzoClient, this.pkcs7)
    }



}