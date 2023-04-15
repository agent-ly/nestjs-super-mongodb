import { MongoClient } from "mongodb";

import {
  getMongoConnectionToken,
  getDbToken,
  getCollectionToken,
} from "../common/tokens.util.js";

export interface CreateDbProviderOptions {
  name?: string;
  connectionName?: string;
}

export const createDbProvider = (
  nameOrOptions?: string | CreateDbProviderOptions
) => {
  if (typeof nameOrOptions === "string")
    nameOrOptions = { name: nameOrOptions };
  return {
    provide: getDbToken(nameOrOptions),
    useFactory: (client: MongoClient) =>
      client.db((nameOrOptions as CreateDbProviderOptions)?.name),
    inject: [getMongoConnectionToken(nameOrOptions?.connectionName)],
  };
};

export interface CreateCollectionProviderOptions {
  dbName?: string;
  connectionName?: string;
}

export const createCollectionProvider = (
  name: string,
  options?: CreateCollectionProviderOptions
) => ({
  provide: getCollectionToken(name, {
    dbName: options?.dbName,
    connectionName: options?.connectionName,
  }),
  useFactory: (client: MongoClient) =>
    client.db(options?.dbName).collection(name),
  inject: [getMongoConnectionToken(options?.connectionName)],
});
