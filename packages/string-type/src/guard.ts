import { BaseGuard } from "@schema-to-yup/core";
import { TypeHandler } from "./string";

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
      TypeHandler.create(this.obj, this.config).createSchemaEntry()
    );
  }
}
