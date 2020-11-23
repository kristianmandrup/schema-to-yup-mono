import { Guard } from "@schema-to-yup/core";
import { YupString } from "./string";

export class StringGuard extends Guard {
  constructor(obj, config = {}) {
    super(obj, config);
  }

  isString() {
    return this.config.isString(this.obj);
  }

  handle() {
    return (
      this.isString() &&
      YupString.create({ ...this.obj, config: this.config }).createSchemaEntry()
    );
  }
}
