import { BaseGuard } from "@schema-to-yup/core";
import { TypeHandler } from "./date";

export class Guard extends BaseGuard {
  constructor(obj, config) {
    super(obj, config);
  }

  isDate() {
    return this.config.isDate(this.obj);
  }

  handle() {
    return (
      this.isDate() &&
      TypeHandler.create(this.obj, this.config).createSchemaEntry()
    );
  }
}
