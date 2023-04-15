import type {
  MongoAdapter,
  MongoAdapterOptions,
} from "@socket.io/mongo-adapter";
import type { Emitter as MongoEmitter } from "@socket.io/mongo-emitter";
import type { SocketIoAdapterCtor } from "nestjs-recipes/builders/connection";

export type MongoAdapterCtor = SocketIoAdapterCtor<MongoAdapter>;

export interface RegisterAdapterCtorOptions {
  collectionName: string;
  dbName?: string;
  connectionName?: string;
  options?: Partial<MongoAdapterOptions>;
}

export interface RegisterEmitterOptions {
  isGlobal?: boolean;
  collectionName: string;
  nsp?: string;
  dbName?: string;
  connectionName?: string;
}

export type { MongoAdapter, MongoEmitter };
