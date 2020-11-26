import * as yup from "yup";
import { typeMatcher, Base } from "@schema-to-yup/core";
const { isObjectType } = typeMatcher;

export { createSchemaEntry };

import { createSchemaEntry } from "../entry";

function isObject(type: string) {
  return type && type === "object";
}

export function buildSchema(schema: any, config = {}) {
  return createBuilder(config).build(schema);
}

export function createBuilder(config = {}) {
  return new SchemaBuilder(config);
}

export class SchemaBuilder extends Base {
  config: any;
  schema: any;
  type: string = "";
  properties: any;
  additionalProps: any;
  required: any[] = [];
  shapeConfig: any;
  validSchema: boolean = false;
  objPropsShape: any;
  addPropsShape: any;
  _output: any;

  constructor(config: any = {}) {
    super(config);
    config.buildSchema = buildSchema;
    config.createSchemaEntry = config.createSchemaEntry || createSchemaEntry;
    this.config = Object.assign(this.config, config);
  }

  build(schema: any) {
    const { config } = this;
    this.schema = schema;
    this.config.schema = schema;
    const type = this.getType(schema);
    const props = this.getProps(schema);
    this.type = type;
    this.properties = props;
    this.additionalProps = this.getAdditionalProperties(schema);
    this.required = this.getRequired(schema);

    if (!isObject(type)) {
      this.error(`invalid schema: must be type: "object", was type: ${type}`);
      return;
    }

    if (!typeMatcher.isObjectType(props)) {
      const props = JSON.stringify(this.properties);
      this.error(`invalid schema: must have a properties object: ${props}`);
      return;
    }

    const name = this.getName(schema);
    const properties = this.normalizeRequired();
    const shapeConfig = this.propsToShape({ properties, name, config });

    this.shapeConfig = shapeConfig;
    this.validSchema = true;
    return this.output;
  }

  getAdditionalProperties(schema: { additionalProperties: any }) {
    return schema.additionalProperties;
  }

  getRequired(objPropertySchema: { required: any }) {
    const { getRequired } = this.config;
    return getRequired
      ? getRequired(objPropertySchema)
      : objPropertySchema.required || [];
  }

  getProps(objPropertySchema: any) {
    return this.config.getProps(objPropertySchema);
  }

  getType(objPropertySchema: any) {
    return this.config.getType(objPropertySchema);
  }

  getName(objPropertySchema: any) {
    return this.config.getName(objPropertySchema);
  }

  get output() {
    this._output = this._output || this.createShape();
    return this._output;
  }

  createShape() {
    yup.object().shape(this.shapeConfig);
  }

  // TODO: extract to Normalizer
  normalizeRequired() {
    const properties = {
      ...this.properties,
    };
    const required = [...this.required] || [];
    // this.logInfo("normalizeRequired", {
    //   properties,
    //   required
    // });
    const propKeys = Object.keys(properties);
    return propKeys.reduce((acc, key) => {
      // this.logInfo("normalizeRequired", {
      //   key
      // });
      const value = properties[key];
      const isRequired = required.indexOf(key) >= 0;
      if (isObjectType(value)) {
        value.required = this.isRequired(value) || isRequired;
      } else {
        this.warn(`Bad value: ${value} must be an object`);
      }

      acc[key] = value;
      return acc;
    }, {});
  }

  isRequired(value: any) {
    return this.config.isRequired(value);
  }

  propsToShape(objPropertySchema: any = {}) {
    const shape = this.objPropsToShape(objPropertySchema);
    this.objPropsShape = shape;
    this.addPropsShape = this.additionalPropsToShape(objPropertySchema, shape);
    return shape;
  }

  additionalPropsToShape(_: {}, shape: {}) {
    return shape;
  }

  objPropsToShape({ name }) {
    const properties = {
      ...this.properties,
    };
    const keys = Object.keys(properties);
    return keys.reduce((acc, key) => {
      const value = properties[key];
      const propertySchema = {
        key,
        value,
        name,
      };
      const schemaEntry = this.propToSchemaEntry(propertySchema, this.config);
      this.logInfo("propsToShape", { key, schemaEntry });
      acc[key] = schemaEntry;
      return acc;
    }, {});
  }

  propToSchemaEntry(propertySchema, config) {
    return this.createSchemaEntry(propertySchema, config);
  }

  createSchemaEntry(propertySchema, config) {
    return config.createSchemaEntry(propertySchema, config);
  }
}
