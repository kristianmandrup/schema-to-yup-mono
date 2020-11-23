import { Guard } from "@schema-to-yup/core";
import { YupDate } from "./date";

export class DateGuard extends Guard {
  constructor(obj, config) {
    super(obj, config);
  }

  isDate() {
    return this.config.isDate(this.obj);
  }

  handle() {
    return (
      this.isDate() &&
      YupDate.create({ ...this.obj, ...this.config }).createSchemaEntry()
    );
  }
}
