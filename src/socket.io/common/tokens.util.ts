import {
  getAdapterCtorToken,
  getEmitterToken,
} from "nestjs-recipes/builders/connection";

import { MODULE_NAME } from "../../core/core.module-definition.js";

export const getMongoAdapterCtorToken = (connectionName?: string) =>
  getAdapterCtorToken(MODULE_NAME, connectionName);

export const getMongoEmitterToken = (connectionName?: string) =>
  getEmitterToken(MODULE_NAME, connectionName);
