import { Injectable, Logger } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { DEFAULT_CONNECTION_NAME } from "nestjs-recipes/builders/connection";
import type {
  ChangeStreamDocument,
  Collection,
  Document,
  MongoClient,
} from "mongodb";

import { getMongoConnectionToken } from "../common/tokens.util.js";
import type { DbTriggerOptions } from "./decorators/db-trigger.decorator.js";

export type RegisterDbTriggerOptions =
  | DbTriggerOptions
  | ({ collection: Collection } & Omit<
      DbTriggerOptions,
      "collectionName" | "dbName" | "connectionName"
    >);

@Injectable()
export class MongoTriggersService {
  private readonly logger = new Logger(MongoTriggersService.name);

  private readonly replicaSetConnectionNames = new Map<string, boolean>();

  constructor(private readonly moduleRef: ModuleRef) {}

  registerDbTrigger(
    options: RegisterDbTriggerOptions,
    callback: (change: ChangeStreamDocument) => void
  ) {
    let collection: Collection;
    if ("collection" in options) {
      if (!options.collection) throw new Error("`collection` is undefined.");
      collection = options.collection;
    } else {
      if (!options.collectionName)
        throw new Error(
          "`collectionName` is required if `collection` is not provided."
        );
      if (!this.isReplicaSet(options.connectionName)) {
        this.logger.warn(
          `Database Trigger "${options.name}" will not be registered because the client is not connected to a replica set.`
        );
        return;
      }
      collection = this.getCollection(
        options.collectionName,
        options.dbName,
        options.connectionName
      );
    }
    const pipeline: Document[] = [];
    if (options.operationTypes) {
      const document = { $match: { operationType: {} } };
      if (options.operationTypes.length === 1)
        document.$match.operationType = options.operationTypes[0];
      else document.$match.operationType = { $in: options.operationTypes };
      pipeline.push(document);
    }
    if (options.match) pipeline.push({ $match: options.match });
    if (options.project) pipeline.push({ $project: options.project });
    const changeStream = collection.watch(pipeline);
    changeStream.on("change", callback);
    this.logger.debug(`Registered Database Trigger "${options.name}"`);
  }

  private isReplicaSet(connectionName = DEFAULT_CONNECTION_NAME) {
    if (this.replicaSetConnectionNames.has(connectionName)) {
      return this.replicaSetConnectionNames.get(connectionName);
    }
    const client = this.getConnection(connectionName);
    const isReplicaSet = !!client.options.replicaSet;
    this.replicaSetConnectionNames.set(connectionName, isReplicaSet);
    return isReplicaSet;
  }

  private getConnection(connectionName?: string) {
    const connectionToken = getMongoConnectionToken(connectionName);
    const client = this.moduleRef.get<MongoClient>(connectionToken, {
      strict: false,
    });
    return client;
  }

  private getCollection(
    collectionName: string,
    dbName?: string,
    connectionName?: string
  ) {
    const client = this.getConnection(connectionName);
    return client.db(dbName).collection(collectionName);
  }
}
