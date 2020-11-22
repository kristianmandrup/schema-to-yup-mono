import * as yup from "yup";
import { typeMatcher, Base } from "@schema-to-yup/core";
const { isObjectType } = typeMatcher;

export * from "./resolver";
export * from "./constraint-builder";
export * from "@schema-to-yup/core/lib/error";
import { createYupSchemaEntry } from "./entry";

function isObject(type: string) {
  return type && type === "object";
}

export function buildYup(schema: any, config = {}) {
  return new YupBuilder(schema, config).yupSchema;
}

export class YupBuilder extends Base {
  config: any;
  schema: any;
  type: string;
  properties: any;
  additionalProps: any;
  required: any[];
  shapeConfig: any;
  validSchema: boolean = false;
  objPropsShape: any;
  addPropsShape: any;

  constructor(schema: any, config: any = {}) {
    super(config);
    config.buildYup = buildYup;
    config.createYupSchemaEntry =
      config.createYupSchemaEntry || createYupSchemaEntry;
    this.config = Object.assign(this.config, config);

    this.schema = schema;
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
  }

  getAdditionalProperties(schema: { additionalProperties: any }) {
    return schema.additionalProperties;
  }

  getRequired(obj: { required: any }) {
    const { getRequired } = this.config;
    return getRequired ? getRequired(obj) : obj.required || [];
  }

  getProps(obj: any) {
    return this.config.getProps(obj);
  }

  getType(obj: any) {
    return this.config.getType(obj);
  }

  getName(obj: any) {
    return this.config.getName(obj);
  }

  get yupSchema() {
    return yup.object().shape(this.shapeConfig);
  }

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

  propsToShape(opts = {}) {
    const shape = this.objPropsToShape(opts);
    this.objPropsShape = shape;
    this.addPropsShape = this.additionalPropsToShape(opts, shape);
    return shape;
  }

  additionalPropsToShape(opts: {}, shape: {}) {
    return shape;
  }

  objPropsToShape({ name }) {
    const properties = {
      ...this.properties,
    };
    const keys = Object.keys(properties);
    return keys.reduce((acc, key) => {
      const value = properties[key];
      const yupSchemaEntry = this.propToYupSchemaEntry({
        name,
        key,
        value,
      });
      this.logInfo("propsToShape", { key, yupSchemaEntry });
      acc[key] = yupSchemaEntry;
      return acc;
    }, {});
  }

  propToYupSchemaEntry({ name, key, value = {} }) {
    return this.createYupSchemaEntry({
      schema: this.schema,
      name,
      key,
      value,
      config: this.config,
    });
  }

  createYupSchemaEntry({ schema, name, key, value, config }) {
    // return createYupSchemaEntry({ name, key, value, config });
    const yupEntry = config.createYupSchemaEntry({
      schema,
      name,
      key,
      value,
      config,
    });
    return yupEntry; // .toEntry();
  }
}
