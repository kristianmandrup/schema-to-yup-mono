import { createNumberGuard } from "./guard";

const proceed = (obj, config = {}) => {
  return createNumberGuard(obj, config).verify();
};

export const toNumber = (obj, config = {}) => {
  return proceed(obj, config) && buildNumber(obj, config);
};

export function toNumberSchemaEntry(obj, config = {}) {
  return proceed(obj, config) && buildSchemaEntry(obj, config);
}

function buildSchemaEntry(obj, config) {
  return TypeHandler.schemaEntryFor(obj, config);
}

function buildNumber(obj, config) {
  return TypeHandler.create(obj, config);
}

import { BaseType } from "@schema-to-yup/base-type";

export class TypeHandler extends BaseType {
  constructor(obj, config) {
    super(obj, config);
    this.type = this.normalizeNumType(obj.type);
  }

  get typeName() {
    return "number";
  }

  normalizeNumType(type) {
    return type === "int" ? "integer" : type;
  }

  static create(obj, config) {
    return new TypeHandler(obj, config);
  }

  static schemaEntryFor(obj, config) {
    return TypeHandler.create(obj, config).createSchemaEntry();
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
