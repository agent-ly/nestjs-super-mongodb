import { Test, type TestingModule } from "@nestjs/testing";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { MongoModule } from "../dist/main/mod.js";
import {
  MongoTriggersModule,
  MongoTriggersService,
} from "../dist/triggers/mod.js";

describe("SocketIoMongoModule", () => {
  let module: TestingModule;
  let triggersService: MongoTriggersService;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MongoModule.forRoot(), MongoTriggersModule],
    }).compile();
    await module.init();
    triggersService = await module.get(MongoTriggersService);
  });
  afterAll(() => module && module.close());
  it("should resolve triggers service", () =>
    expect(triggersService).not.toBeNull());
});
