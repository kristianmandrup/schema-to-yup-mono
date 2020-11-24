import { Base, typeMatcher } from "@schema-to-yup/core";

import { createPropertyValueResolver } from "../resolver";

export class YupSchemaEntryError extends Error {}

export class YupSchemaEntry extends Base {
  schema: any;
  name: string;
  key: string;
  value: any;
  kind: string;
  type: string;
  typeHandlers: any;

  propertyValueHandler: any;

  constructor(opts) {
    super(opts.config);
    const { schema, name, key, value, config } = opts;
    this.opts = opts;
    this.schema = schema;
    this.key = key;
    this.value = value || {};
    this.config = config || {};
    this.name = name;
    const type = Array.isArray(value) ? "array" : value.type;
    this.kind = type === "array" ? "multi" : "single";
    this.type = type;
    this.setTypeHandlers();
    this.setPropertyHandler();
  }

  get types() {
    return this.config.types;
  }

  setPropertyHandler() {
    const { config, types, value, name, key, type, kind, schema } = this;
    const opts = {
      type,
      kind,
      types,
      value,
      name,
      key,
      schema,
    };
    const createPropertyValueHandlerFn =
      config.createPropertyValueHandler || this.createPropertyValueHandler;
    this.propertyValueHandler = createPropertyValueHandlerFn(opts, config);
  }

  createPropertyValueHandler(opts, config) {
    return createPropertyValueResolver(opts, config);
  }

  get defaultTypeHandlerMap() {
    return this.types;
  }

  setTypeHandlers() {
    this.typeHandlers = {
      ...this.defaultTypeHandlerMap,
      ...(this.config.typeHandlers || {}),
    };
  }

  isValidSchema() {
    const { type } = this;
    return typeMatcher.isStringType(type);
  }

  error(msg, data?) {
    const { opts } = this;
    data ? console.error(msg, data, ...opts) : console.error(msg, ...opts);
    throw new YupSchemaEntryError(msg);
  }

  toEntry() {
    if (!this.isValidSchema()) {
      const schema = JSON.stringify(this.schema);
      this.error(
        `Not a valid schema: type ${
          this.type
        } must be a string, was ${typeof this.type} ${schema}`
      );
    }
    const { opts, config } = this;
    return this.propertyValueHandler.resolve(opts, config);
  }
}
