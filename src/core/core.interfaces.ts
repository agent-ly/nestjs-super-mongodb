import type { MongoClientOptions } from "mongodb";

export interface MongoModuleOptions {
  url: string;
  options?: MongoClientOptions;
}

export interface MongoModuleExtraOptions {
  connectionName?: string;
}
