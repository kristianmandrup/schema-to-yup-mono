import { Converter } from "@schema-to-yup/base-type/src/converter";
import { TypeModeSelector } from "./type-mode-selector";
import { TypeValueProcessor } from "./type-value-processor";
import { TypeErrorHandler } from "./type-error-handler";
import { Base } from "@schema-to-yup/core";
import * as yup from "yup";

const defaults = {
  classMap: {
    Converter,
    TypeModeSelector,
    TypeValueProcessor,
    TypeErrorHandler,
  },
};

export class BaseType extends Base {
  instance: any;
  key?: string;
  type?: string;
  schema: any;
  properties: any;
  value: any;
  typeInstance: any;
  constraints: any;
  format?: string;

  typeErrorHandler: any;
  mixed: any;
  converter: any;
  constraintsProcessor: any;
  typeModeSelector: any;
  typeValueProcessor: any;
  errMessages: any;
  constraintsAdded: any;

  constructor(propertySchema: any = {}, config) {
    super(propertySchema, config);
    this.init();
  }

  get types() {
    return this.config.types;
  }

  get typeName() {
    return "mixed";
  }

  get mixedType() {
    return this.types.mixed;
  }

  setTypeInstance(inst) {
    this.typeInstance = inst || this.typeInstance;
    return this;
  }

  chain(cb) {
    return this.setTypeInstance(cb(this.typeInstance));
  }

  setInstType(name = this.typeName) {
    this.type = name;
    const inst = this.instance[name]();
    return this.setTypeInstance(inst);
  }

  valErrMessage(msgName) {
    return this.typeErrorHandler.valErrMessage(msgName);
  }

  valErrMessageOr(...msgNames) {
    return this.typeErrorHandler.valErrMessageOr(...msgNames);
  }

  addConstraint(alias, opts) {
    this.constraintsAdder.addConstraint(alias, opts);
  }

  validateKey(key, opts) {
    if (!key) {
      this.error(`create: missing key ${this.stringify(opts)}`);
    }
    return this;
  }

  validateValue(value, opts) {
    if (!value) {
      this.error(`create: missing value ${this.stringify(opts)}`);
    }
    return this;
  }

  validateOnCreate(key, value, opts) {
    this.validateKey(key, opts);
    this.validateValue(value, opts);
    return this;
  }

  init() {
    this.configure();
    this.initHelpers();
    return this;
  }

  configure() {
    const { propertySchema, config } = this;
    let { key, value } = propertySchema;
    let { schema } = config;
    schema = schema || {};
    this.validateOnCreate(key, value, propertySchema);
    this.instance = yup;
    this.key = key;
    this.schema = schema;
    this.properties = schema.properties || {};
    this.value = value;
    this.constraints = this.getConstraints();
    this.format = value.format || this.constraints.format;
    this.config = config || {};
    this.setInstType("mixed");
    this.errMessages = config.errMessages || {};
    this.constraintsAdded = {};
    return this;
  }

  constraintNameFor(...names) {
    return names.find((name) => this.constraints[name]);
  }

  initHelpers() {
    this.mixed = this.createMixed();
    this.converter = this.createConverter();
    this.constraintsProcessor = this.createConstraintsProcessor();
    this.typeModeSelector = this.createTypeModeSelector();
    this.typeValueProcessor = this.createTypeValueProcessor();
    this.typeErrorHandler = this.createTypeErrorHandler();
    return this;
  }

  setClassMap() {
    const { config } = this;
    this.classMap = {
      ...(defaults.classMap || {}),
      ...(config.classMap || {}),
    };
  }

  getConstraints() {
    return this.constraintsAdder.getConstraints();
  }

  createConstraintsProcessor() {
    return new this.classMap.ConstraintsProcessor(this, this.config);
  }

  createTypeValueProcessor() {
    return new this.classMap.TypeValueProcessor(this, this.config);
  }

  createTypeModeSelector() {
    return new this.classMap.TypeModeSelector(this, this.config);
  }

  createTypeErrorHandler() {
    return new this.classMap.TypeErrorHandler(this, this.config);
  }

  get constraintsAdder() {
    return this.converter.constraintsAdder;
  }

  convert() {
    this.converter.convert();
    return this;
  }

  createSchemaEntry() {
    return this.convert().typeInstance;
  }

  createConverter() {
    return new this.classMap.Converter(this, this.propertySchema);
  }

  createMixed() {
    return new this.classMap.YupMixed(this.propertySchema);
  }
}
