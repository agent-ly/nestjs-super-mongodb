import { Test, type TestingModule } from "@nestjs/testing";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { MongoClient } from "mongodb";

import { MongoModule, getMongoConnectionToken } from "../dist/main/mod.js";

describe("MongoModule", () => {
  let module: TestingModule;
  let client: MongoClient;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MongoModule.forRoot()],
    }).compile();
    await module.init();
    client = module.get(getMongoConnectionToken());
  });
  afterAll(() => module && module.close());
  it("should resolve default client", () => expect(client).not.toBeNull());
});
