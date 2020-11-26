import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export function createTypeHandler(obj, config = {}) {
  return obj && new Guard(obj, config).handle();
}

export class TypeHandler extends BaseType {
  constructor(obj, config) {
    super(obj, config);
  }

  get yupType() {
    return "date";
  }

  static create(obj, config) {
    return new TypeHandler(obj, config);
  }

  get typeEnabled() {
    return ["minDate", "maxDate"];
  }
}
