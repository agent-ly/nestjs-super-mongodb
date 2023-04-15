import { getConnectionToken } from "nestjs-recipes/builders/connection";

import { MODULE_NAME } from "../core/core.module-definition.js";

export const DEFAULT_DB_NAME = "default";

export const getMongoConnectionToken = (connectionName?: string) =>
  getConnectionToken(MODULE_NAME, connectionName);

export interface GetDbTokenOptions {
  name?: string;
  connectionName?: string;
}

export const getDbToken: {
  (name?: string): string;
  (options?: GetDbTokenOptions): string;
  (nameOrOptions?: string | GetDbTokenOptions): string;
} = (nameOrOptions?: string | GetDbTokenOptions) => {
  if (typeof nameOrOptions === "string")
    nameOrOptions = { name: nameOrOptions };
  return `${getMongoConnectionToken(nameOrOptions?.connectionName)}/${
    nameOrOptions?.name ?? DEFAULT_DB_NAME
  }_db`;
};

export interface GetCollectionTokenOptions {
  dbName?: string;
  connectionName?: string;
}

export const getCollectionToken = (
  name: string,
  options?: GetCollectionTokenOptions
) =>
  `${getDbToken({
    name: options?.dbName,
    connectionName: options?.connectionName,
  })}/${name}_collection`;
