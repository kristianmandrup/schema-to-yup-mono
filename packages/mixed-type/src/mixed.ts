import { BaseType } from "@schema-to-yup/base-type";

export const createTypeHandler = (obj, config) =>
  TypeHandler.create(obj, config);

export class TypeHandler extends BaseType {
  constructor(obj, config) {
    super(obj, config);
    this.init();
  }

  static create(opts, config) {
    return new TypeHandler(opts, config);
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
