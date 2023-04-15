import type { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";

import type {
  RegisterAdapterCtorOptions,
  RegisterEmitterOptions,
} from "./socket.io.interfaces.js";
import {
  createSocketIoMongoAdapterCtorProvider,
  createSocketIoMongoEmitter,
} from "./socket.io.providers.js";

@Module({})
export class SocketIoMongoModule {
  static registerAdapterCtor({
    collectionName,
    dbName,
    connectionName,
    options: adapterOptions,
  }: RegisterAdapterCtorOptions): DynamicModule {
    const adapterCtorProvider = createSocketIoMongoAdapterCtorProvider(
      collectionName,
      dbName,
      connectionName,
      adapterOptions
    );
    return {
      module: SocketIoMongoModule,
      providers: [adapterCtorProvider],
      exports: [adapterCtorProvider],
    };
  }

  static registerEmitter({
    isGlobal,
    collectionName,
    nsp,
    dbName,
    connectionName,
  }: RegisterEmitterOptions): DynamicModule {
    const emitterProvider = createSocketIoMongoEmitter(
      collectionName,
      nsp,
      dbName,
      connectionName
    );
    let module: DynamicModule = {
      module: SocketIoMongoModule,
      providers: [emitterProvider],
      exports: [emitterProvider],
    };
    if (isGlobal) module = { global: isGlobal, ...module };
    return module;
  }
}
