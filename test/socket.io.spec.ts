import { Test, type TestingModule } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { MongoModule } from "../dist/main/mod.js";
import {
  SocketIoMongoModule,
  getMongoAdapterCtorToken,
  getMongoEmitterToken,
} from "../dist/socket.io/mod.js";

describe("SocketIoMongoModule", () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongoModule.forRoot(),
        SocketIoMongoModule.registerAdapterCtor({
          collectionName: "test_socket.io",
        }),
        SocketIoMongoModule.registerEmitter({
          collectionName: "test_socket.io",
        }),
      ],
    }).compile();
    await module.init();
  });
  afterAll(() => module && module.close());
  it("should resolve adapter ctor", () =>
    expect(module.get(getMongoAdapterCtorToken())).not.toBeNull());
  it("should resolve emitter", () =>
    expect(module.get(getMongoEmitterToken())).not.toBeNull());
});
