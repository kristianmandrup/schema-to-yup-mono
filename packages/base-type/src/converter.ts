import uniq from "uniq";
import { Base } from "@schema-to-yup/core";
import { ConstraintsAdder } from "./constraints-adder";
import { ConstraintConverter } from "./constraint-converter";

const defaults = {
  classMap: {
    ConstraintsAdder,
    ConstraintConverter,
  },
};

export class Converter extends Base {
  handler: any;
  constraintsAdder: any;
  constraintConverter: any;
  types: any;
  constraintsMap: any;
  ProcessorClazz: any;

  constructor(handler, propertySchema, config: any = {}) {
    super(propertySchema, config);
    this.handler = handler;
    this.init();
    const { types } = this.config;
    this.types = types;
    this.constraintsMap = types.constraints || {};
    this.ProcessorClazz = this.constraintsMap[this.type].Processor;
    this.createHelpers();
  }

  createHelpers() {
    this.constraintsAdder = this.createConstraintsAdder();
    this.constraintConverter = this.createConstraintConverter();
  }

  createMixedType() {
    return this.types.createTypeHandler(this.propertySchema);
  }

  // create or get Mixed
  get mixed() {
    return this.createMixedType();
  }

  convertMixed() {
    return this.mixed.convert();
  }

  get typeEnabled() {
    return this.handler.typeEnabled;
  }

  get type() {
    return this.handler.type;
  }

  init() {
    this.setClassMap(defaults);
    this.configureTypeConfig();
  }

  configureTypeConfig() {
    if (this.typeConfig.enabled || this.typeConfig.extends) return;
    if (!this.typeConfig.convert) return;
    this.typeConfig.extends = Object.keys(this.typeConfig.convert);
  }

  get typeConfig() {
    return this.config[this.type] || {};
  }

  calcTypeExtends() {
    const { typeConfig, typeEnabled } = this;
    if (!Array.isArray(typeConfig.extends)) return;
    return uniq([...typeConfig.extends, ...typeEnabled]);
  }

  get configuredTypeEnabled() {
    const { typeConfig, typeEnabled } = this;
    return Array.isArray(typeConfig.enabled) ? typeConfig.enabled : typeEnabled;
  }

  calcTypeEnabled() {
    return this.calcTypeExtends() || this.configuredTypeEnabled;
  }

  get enabled() {
    return this.calcTypeEnabled();
  }

  convertFor(name) {
    return this.constraintConverter.setName(name).convert();
  }

  convertEnabled() {
    this.enabled.map((name) => {
      this.convertFor(name);
    });
  }

  get constraintsProcessor() {
    return new this.ProcessorClazz(
      this.handler,
      this.propertySchema,
      this.config
    );
  }

  convert() {
    this.addMappedConstraints();
    this.convertMixed();
    this.convertEnabled();
    return this;
  }

  addMappedConstraints() {
    this.constraintsAdder.addMappedConstraints();
  }

  createConstraintsAdder() {
    return new this.classMap.ConstraintsAdder(
      this.handler,
      this.propertySchema,
      this.config
    );
  }

  createConstraintConverter() {
    return new ConstraintConverter(
      this.handler,
      this.propertySchema,
      this.config
    );
  }
}
