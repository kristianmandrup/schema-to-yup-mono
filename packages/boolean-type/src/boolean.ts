import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export function createTypeHandler(obj, config = {}) {
  return obj && new Guard(obj, config).handle();
}

export class TypeHandler extends BaseType {
  constructor(obj) {
    super(obj);
  }

  get yupType() {
    return "boolean";
  }

  static create(obj) {
    return new TypeHandler(obj);
  }
}
