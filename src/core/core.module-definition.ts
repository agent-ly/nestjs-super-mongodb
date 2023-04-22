import { Logger } from "@nestjs/common";
import {
  DEFAULT_CONNECTION_NAME,
  createConfigurableConnectionModuleBuilder,
} from "nestjs-recipes/builders/connection";
import { MongoClient } from "mongodb";

import type {
  MongoModuleOptions,
  MongoModuleExtraOptions,
} from "./core.interfaces.js";

export const MODULE_NAME = "mongo_core_module";
export const { OPTIONS_TYPE, ASYNC_OPTIONS_TYPE, ConfigurableModuleClass } =
  createConfigurableConnectionModuleBuilder<
    MongoModuleOptions,
    MongoModuleExtraOptions
  >(
    MODULE_NAME,
    async ({ connectionName = DEFAULT_CONNECTION_NAME, url, options }) => {
      const client = new MongoClient(url, options);
      const logger = new Logger(`MongoCoreModule(${connectionName})`);
      logger.log("Connecting ...");
      await client.connect();
      logger.log("Connected.");
      return client;
    }
  )
    .setClassMethodName("forRoot")
    .build();
