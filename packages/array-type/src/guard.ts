import { BaseGuard } from "@schema-to-yup/core";
import { ArrayType } from "./array";

export class Guard extends BaseGuard {
  constructor(obj, config) {
    super(obj, config);
  }

  isArray() {
    if (!this.config.isArray) {
      this.error("ArrayHandler: mising isArray in config", this.config);
    }
    return this.config.isArray(this.obj);
  }

  handle() {
    return (
      this.isArray() &&
      ArrayType.create({ ...this.obj, ...this.config }).createSchemaEntry()
    );
  }
}
