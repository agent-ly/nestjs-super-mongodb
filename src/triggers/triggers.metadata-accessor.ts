import { Reflector } from "@nestjs/core";
import { Injectable } from "@nestjs/common";

import {
  DB_TRIGGER_METADATA,
  DB_TRIGGER_OPTIONS_METADATA,
  type DbTriggerOptions,
} from "./decorators/db-trigger.decorator.js";

@Injectable()
export class MongoTriggersMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isDbTrigger(target: Function): boolean {
    return !!this.reflector.get(DB_TRIGGER_METADATA, target);
  }

  getDbTriggerOptions(target: Function): DbTriggerOptions {
    return this.reflector.get(DB_TRIGGER_OPTIONS_METADATA, target);
  }
}
