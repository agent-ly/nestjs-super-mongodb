import { SetMetadata, applyDecorators } from "@nestjs/common";
import { Document } from "mongodb";

export const DB_TRIGGER_METADATA = "mongodb:db_trigger";
export const DB_TRIGGER_OPTIONS_METADATA = "mongodb:db_trigger_options";

export type DbTriggerOperationType = "insert" | "update" | "replace" | "delete";

export interface DbTriggerOptions {
  name?: string;
  collectionName: string;
  dbName?: string;
  connectionName?: string;
  operationTypes?: DbTriggerOperationType[];
  match?: Document;
  project?: Document;
}

export const DbTrigger = (options: DbTriggerOptions) =>
  applyDecorators(
    SetMetadata(DB_TRIGGER_METADATA, true),
    SetMetadata(DB_TRIGGER_OPTIONS_METADATA, options)
  );
