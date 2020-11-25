import { BaseGuard } from "@schema-to-yup/core";
import { DateType } from "./date";

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
      DateType.create({ ...this.obj, ...this.config }).createSchemaEntry()
    );
  }
}
