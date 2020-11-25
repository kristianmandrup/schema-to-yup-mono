import { createNumberGuard } from "./guard";

const proceed = (obj, config = {}) => {
  return createNumberGuard(obj, config).verify();
};

export const toNumber = (obj, config = {}) => {
  return proceed(obj, config) && buildNumber(obj);
};

export function toNumberSchemaEntry(obj, config = {}) {
  return proceed(obj, config) && buildSchemaEntry(obj);
}

function buildSchemaEntry(obj) {
  return TypeHandler.schemaEntryFor(obj);
}

function buildNumber(obj) {
  return TypeHandler.create(obj);
}

import { BaseType } from "@schema-to-yup/base-type";

export class TypeHandler extends BaseType {
  constructor(obj) {
    super(obj);
    this.type = this.normalizeNumType(obj.type);
  }

  get typeName() {
    return "number";
  }

  normalizeNumType(type) {
    return type === "int" ? "integer" : type;
  }

  static create(obj) {
    return new TypeHandler(obj);
  }

  static schemaEntryFor(obj) {
    return TypeHandler.create(obj).createSchemaEntry();
  }

  get typeEnabled() {
    return ["range", "positive", "negative", "integer"];
  }

  convert() {
    super.convert();
    return this;
  }

  normalize() {
    this.constraints.maximum = this.constraints.maximum || this.constraints.max;
    this.constraints.minimum = this.constraints.minimum || this.constraints.min;
  }
}
