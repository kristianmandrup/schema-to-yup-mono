import { BaseGuard } from "@schema-to-yup/core";
import { TypeHandler } from "./array";

export class Guard extends BaseGuard {
  constructor(obj, config) {
    super(obj, config);
  }

  isArray() {
    if (!this.config.isArray) {
      this.error("array.Guard: mising isArray in config", this.config);
    }
    return this.config.isArray(this.obj);
  }

  handle() {
    return (
      this.isArray() &&
      TypeHandler.create({ ...this.obj, ...this.config }).createSchemaEntry()
    );
  }
}
