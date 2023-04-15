import { Inject } from "@nestjs/common";

import {
  getMongoAdapterCtorToken,
  getMongoEmitterToken,
} from "./tokens.util.js";

export const InjectMongoAdapterCtor = (connectionName?: string) =>
  Inject(getMongoAdapterCtorToken(connectionName));

export const InjectMongoEmitter = (connectionName?: string) =>
  Inject(getMongoEmitterToken(connectionName));
