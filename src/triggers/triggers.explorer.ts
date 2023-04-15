import { Injectable, type OnModuleInit } from "@nestjs/common";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";

import { MongoTriggersMetadataAccessor } from "./triggers.metadata-accessor.js";
import { MongoTriggersService } from "./triggers.service.js";

@Injectable()
export class MongoTriggersExplorer implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly metadataAccessor: MongoTriggersMetadataAccessor,
    private readonly mongoTriggersService: MongoTriggersService
  ) {}

  onModuleInit() {
    this.explore();
  }

  explore() {
    const providers = this.discoveryService.getProviders();
    for (const provider of providers) {
      if (!provider.instance) continue;
      if (!provider.metatype) continue;
      if (!provider.isDependencyTreeStatic()) continue;
      const methodNames = this.metadataScanner.getAllMethodNames(
        provider.instance
      );
      for (const methodName of methodNames) {
        const callback = provider.instance[methodName];
        if (!this.metadataAccessor.isDbTrigger(callback)) continue;
        this.registerDbTrigger(provider.instance, callback);
      }
    }
  }

  registerDbTrigger(instance: Function, callback: Function) {
    const options = this.metadataAccessor.getDbTriggerOptions(callback);
    if (!options.name)
      options.name = `${instance.constructor.name}.${callback.name}`;
    this.mongoTriggersService.registerDbTrigger(
      options,
      callback.bind(instance)
    );
  }
}
