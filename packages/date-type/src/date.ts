import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export function toInstance(obj, config = {}) {
  return obj && new Guard(obj, config).handle();
}

export class DateType extends BaseType {
  constructor(obj) {
    super(obj);
  }

  get yupType() {
    return "date";
  }

  static create(obj) {
    return new DateType(obj);
  }

  get typeEnabled() {
    return ["minDate", "maxDate"];
  }

  convert() {
    super.convert();
    return this;
  }
}
