import { BaseType } from "@schema-to-yup/base-type";
import { guard } from "./guard";

export function processTypeHandler(obj, config = {}) {
  return guard(obj, config) && createSchemaEntry(obj, config);
}

export function createSchemaEntry(obj, config = {}) {
  return createTypeHandler(obj, config).createSchemaEntry();
}

export function createTypeHandler(obj, config = {}) {
  return new TypeHandler(obj, config);
}

export class TypeHandler extends BaseType {
  constructor(obj, config) {
    super(obj, config);
  }

  get yupType() {
    return "boolean";
  }

  static create(obj, config) {
    return new TypeHandler(obj, config);
  }
}
