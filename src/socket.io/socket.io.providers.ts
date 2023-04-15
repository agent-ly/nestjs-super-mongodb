import {
  createAdapter as createMongoAdapter,
  type MongoAdapterOptions,
} from "@socket.io/mongo-adapter";
import { Emitter as MongoEmitter } from "@socket.io/mongo-emitter";
import {
  createSocketIoAdapterCtorProvider,
  createSocketIoEmitterProvider,
} from "nestjs-recipes/builders/connection";
import type { MongoClient } from "mongodb";

import { MODULE_NAME } from "../core/core.module-definition.js";

export const createSocketIoMongoAdapterCtorProvider = (
  collectionName: string,
  dbName?: string,
  connectionName?: string,
  options?: Partial<MongoAdapterOptions>
) =>
  createSocketIoAdapterCtorProvider(
    MODULE_NAME,
    connectionName,
    async (client: MongoClient) => {
      const collection = client.db(dbName).collection(collectionName);
      const adapterConstructor = createMongoAdapter(collection, options);
      return adapterConstructor;
    }
  );

export const createSocketIoMongoEmitter = (
  collectionName: string,
  nsp?: string,
  dbName?: string,
  connectionName?: string
) =>
  createSocketIoEmitterProvider(
    MODULE_NAME,
    connectionName,
    async (client: MongoClient) => {
      const collection = client.db(dbName).collection(collectionName);
      const emitter = new MongoEmitter(collection, nsp);
      return emitter;
    }
  );
