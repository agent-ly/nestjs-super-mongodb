import { Inject } from "@nestjs/common";

import {
  type GetCollectionTokenOptions,
  getMongoConnectionToken,
  getCollectionToken,
  getDbToken,
  GetDbTokenOptions,
} from "./tokens.util.js";

export const InjectMongoConnection = (connectionName?: string) =>
  Inject(getMongoConnectionToken(connectionName));

export const InjectDb: {
  (name?: string): void;
  (options?: GetDbTokenOptions): void;
} = (nameOrOptions?: string | GetDbTokenOptions) =>
  Inject(getDbToken(nameOrOptions));

export const InjectCollection = (
  name: string,
  options?: GetCollectionTokenOptions
) => Inject(getCollectionToken(name, options));
