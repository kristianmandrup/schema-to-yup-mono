import { YupMixed } from "@schema-to-yup/mixed";
import { BooleanHandler } from "./handler";

export function toYupBoolean(obj, config = {}) {
  return obj && new BooleanHandler(config).handle(obj);
}

export class YupBoolean extends YupMixed {
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
