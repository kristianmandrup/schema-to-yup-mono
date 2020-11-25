import { ObjectType } from "./object";
import { BaseGuard } from "@schema-to-yup/core";

export class Guard extends BaseGuard {
  constructor(obj, config: any = {}) {
    super(obj, config);
  }

  isObject() {
    return this.config.isObject(this.obj.value);
  }

  handle() {
    return (
      this.isObject() &&
      ObjectType.create({
        ...this.obj,
        config: this.config,
      }).createSchemaEntry()
    );
  }
}

export function createObjectGuard(obj, config = {}) {
  return new Guard(obj, config);
}
