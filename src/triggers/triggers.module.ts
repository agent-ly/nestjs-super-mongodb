import { Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";

import { MongoTriggersMetadataAccessor } from "./triggers.metadata-accessor.js";
import { MongoTriggersService } from "./triggers.service.js";
import { MongoTriggersExplorer } from "./triggers.explorer.js";

@Module({
  imports: [DiscoveryModule],
  providers: [
    MongoTriggersMetadataAccessor,
    MongoTriggersService,
    MongoTriggersExplorer,
  ],
  exports: [MongoTriggersService],
})
export class MongoTriggersModule {}
