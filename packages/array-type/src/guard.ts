import { Guard } from "@schema-to-yup/core";
import { YupArray } from "./array";

export class ArrayGuard extends Guard {
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
      YupArray.create({ ...this.obj, ...this.config }).createSchemaEntry()
    );
  }
}
