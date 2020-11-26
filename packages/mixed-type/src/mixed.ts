import { BaseType } from "@schema-to-yup/base-type";

export const createTypeHandler = (propertySchema, config) =>
  TypeHandler.create(propertySchema, config);

export class TypeHandler extends BaseType {
  constructor(propertySchema, config) {
    super(propertySchema, config);
    this.init();
  }

  static create(propertySchema, config) {
    return new TypeHandler(propertySchema, config);
  }

  get typeName() {
    return "mixed";
  }

  init() {
    return this;
  }

  get mixedConfig() {
    return this.config.mixed || {};
  }

  isRequired(value) {
    value = value || this.value;
    return value.required === true;
  }

  // override for each type

  get mixedEnabled() {
    return (
      this.mixedConfig.enabled || [
        "label",
        "oneOf",
        "notOneOf",
        "when",
        "nullable",
        "isType",
      ]
    );
  }
}
