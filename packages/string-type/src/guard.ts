import { BaseGuard } from "@schema-to-yup/core";
import { StringType } from "./string";

export class Guard extends BaseGuard {
  constructor(obj, config = {}) {
    super(obj, config);
  }

  isString() {
    return this.config.isString(this.obj);
  }

  handle() {
    return (
      this.isString() &&
      StringType.create({
        ...this.obj,
        config: this.config,
      }).createSchemaEntry()
    );
  }
}
