import { Global, Inject, Module, OnModuleDestroy } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import {
  getConnectionNameToken,
  getConnectionToken,
} from "nestjs-recipes/builders/connection";
import type { MongoClient } from "mongodb";

import {
  MODULE_NAME,
  ConfigurableModuleClass,
} from "./core.module-definition.js";

@Global()
@Module({})
export class MongoCoreModule
  extends ConfigurableModuleClass
  implements OnModuleDestroy
{
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(getConnectionNameToken(MODULE_NAME))
    private readonly connectionName: string
  ) {
    super();
  }

  async onModuleDestroy() {
    const connection = this.moduleRef.get<MongoClient>(
      getConnectionToken(MODULE_NAME, this.connectionName)
    );
    await connection.close();
  }
}
