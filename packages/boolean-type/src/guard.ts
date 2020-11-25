import { BaseGuard } from "@schema-to-yup/core";
import { TypeHandler } from "./boolean";

export class Guard extends BaseGuard {
  constructor(obj, config) {
    super(obj, config);
  }

  isBoolean() {
    return this.config.isBoolean(this.obj);
  }

  handle() {
    return this.isBoolean() && TypeHandler.create(this.obj).createSchemaEntry();
  }
}
