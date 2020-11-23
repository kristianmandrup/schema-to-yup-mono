import { YupBaseType } from "@schema-to-yup/base-type";
import { DateGuard } from "./guard";

export function toYupDate(obj, config = {}) {
  return obj && new DateGuard(obj, config).handle();
}

export class YupDate extends YupBaseType {
  constructor(obj) {
    super(obj);
  }

  get yupType() {
    return "date";
  }

  static create(obj) {
    return new YupDate(obj);
  }

  get typeEnabled() {
    return ["minDate", "maxDate"];
  }

  convert() {
    super.convert();
    return this;
  }
}
