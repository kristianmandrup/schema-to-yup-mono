import { Guard } from "@schema-to-yup/core";
import { YupBoolean } from "./boolean";

export class BooleanHandler extends Guard {
  constructor(obj, config) {
    super(obj, config);
  }

  isBoolean() {
    return this.config.isBoolean(this.obj);
  }

  handle() {
    return this.isBoolean() && YupBoolean.create(this.obj).createSchemaEntry();
  }
}
