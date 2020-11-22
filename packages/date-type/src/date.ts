import { YupBaseType } from "@schema-to-yup/base-type";
import { DateHandler } from "./handler";

export function toYupDate(obj, config = {}) {
  return obj && new DateHandler(config).handle(obj);
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
