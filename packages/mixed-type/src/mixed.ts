import { BaseType } from "@schema-to-yup/base-type";

export const createTypeHandler = (opts) => TypeHandler.create(opts);

export class TypeHandler extends BaseType {
  constructor(opts: any = {}) {
    super(opts);
    this.init();
  }

  static create(opts) {
    return new TypeHandler(opts);
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
