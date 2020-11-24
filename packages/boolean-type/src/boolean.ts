import { YupBaseType } from "@schema-to-yup/base-type";
import { BooleanHandler } from "./handler";

export function toYupBoolean(obj, config = {}) {
  return obj && new BooleanHandler(obj, config).handle();
}

export class YupBoolean extends YupBaseType {
  constructor(obj) {
    super(obj);
  }

  get yupType() {
    return "boolean";
  }

  static create(obj) {
    return new YupBoolean(obj);
  }
}
