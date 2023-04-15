import { DynamicModule, Module } from "@nestjs/common";

import {
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from "../core/core.module-definition.js";
import { MongoCoreModule } from "../core/core.module.js";
import type {
  RegisterCollectionOptions,
  RegisterDbOptions,
} from "./main.interfaces.js";
import {
  createCollectionProvider,
  createDbProvider,
} from "./main.providers.js";

@Module({})
export class MongoModule {
  static forRoot(url?: string): DynamicModule;
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule;
  static forRoot(urlOrOptions?: string | typeof OPTIONS_TYPE): DynamicModule {
    if (!urlOrOptions) urlOrOptions = { url: "mongodb://localhost:27017" };
    else if (typeof urlOrOptions === "string")
      urlOrOptions = { url: urlOrOptions };
    return {
      module: MongoModule,
      imports: [MongoCoreModule.forRoot(urlOrOptions)],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE) {
    return {
      module: MongoModule,
      imports: [MongoCoreModule.forRootAsync(options)],
    };
  }

  static registerCollection(...collectionNames: string[]): DynamicModule;
  static registerCollection(
    ...collectionOptions: RegisterCollectionOptions[]
  ): DynamicModule;
  static registerCollection(
    ...collectionNameOrOptions: string[] | RegisterCollectionOptions[]
  ) {
    const options = collectionNameOrOptions.map(
      (nameOrOptions: string | RegisterCollectionOptions) =>
        typeof nameOrOptions === "string"
          ? { name: nameOrOptions }
          : nameOrOptions
    );
    const providers = options.map((options) =>
      createCollectionProvider(options.name, {
        dbName: options.dbName,
        connectionName: options.connectionName,
      })
    );
    return {
      module: MongoModule,
      providers,
      exports: providers,
    };
  }

  static registerDb(...dbNames: string[]): DynamicModule;
  static registerDb(...dbOptions: RegisterDbOptions[]): DynamicModule;
  static registerDb(...dbNameOrOptions: string[] | RegisterDbOptions[]) {
    if (dbNameOrOptions.length === 0)
      dbNameOrOptions = [undefined as unknown as string];
    const options = dbNameOrOptions.map(
      (nameOrOptions: string | RegisterDbOptions | undefined) =>
        typeof nameOrOptions === "string"
          ? { name: nameOrOptions }
          : nameOrOptions
    );
    const providers = options.map((options) => createDbProvider(options));
    return {
      module: MongoModule,
      providers,
      exports: providers,
    };
  }
}
