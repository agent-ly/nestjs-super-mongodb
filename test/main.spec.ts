import { Test, TestingModule } from "@nestjs/testing";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import { MongoModule, getMongoConnectionToken } from "../dist/main/mod.js";
import { MongoClient } from "mongodb";

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
  it("should be defined", () => expect(client).toBeDefined());
});
