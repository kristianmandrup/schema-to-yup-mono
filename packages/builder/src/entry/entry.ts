import { Base, typeMatcher } from "@schema-to-yup/core";

import { createPropertyValueResolver } from "../resolver";

export class SchemaEntryError extends Error {}

export class SchemaEntry extends Base {
  schema: any;
  name: string;
  key: string;
  value: any;
  kind: string;
  type: string;
  typeHandlers: any;

  propertyValueHandler: any;

  constructor(propertySchema, config) {
    super(propertySchema, config);
    const { name, key, value } = propertySchema;
    let { schema } = config;
    this.propertySchema = propertySchema;
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
    const { config, types, value, name, key, type, kind } = this;
    const propertySchema = {
      type,
      kind,
      types,
      value,
      name,
      key,
    };
    const createPropertyValueHandlerFn =
      config.createPropertyValueHandler || this.createPropertyValueHandler;
    this.propertyValueHandler = createPropertyValueHandlerFn(
      propertySchema,
      config
    );
  }

  createPropertyValueHandler(propertySchema, config) {
    return createPropertyValueResolver(propertySchema, config);
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
    const { propertySchema } = this;
    data
      ? console.error(msg, data, propertySchema)
      : console.error(msg, propertySchema);
    throw new SchemaEntryError(msg);
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
    const { propertySchema, config } = this;
    return this.propertyValueHandler.resolve(propertySchema, config);
  }
}
