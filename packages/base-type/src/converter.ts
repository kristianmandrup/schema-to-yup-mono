import uniq from "uniq";
import { Base } from "@schema-to-yup/core";
import { ConstraintsAdder } from "./constraints-adder";

const defaults = {
  classMap: {
    ConstraintsAdder,
  },
};

export class Converter extends Base {
  handler: any;
  constraintsAdder: any;
  mixed: any;
  types: any;
  constraintsMap: any;

  constructor(handler, opts: any = {}) {
    super(opts);
    this.handler = handler;
    this.constraintsAdder = this.createConstraintsAdder(opts);
    this.init();
    const { types } = this.config;
    this.types = types;
    this.constraintsMap = types.constraints || {};
  }

  get mixedEnabled() {
    return this.mixed.typesEnabled;
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
    return [...this.mixedEnabled, ...this.calcTypeEnabled()];
  }

  convertEnabled() {
    this.enabled.map((name) => {
      const convertFn = this.convertFnFor(name);
      if (convertFn) {
        convertFn(this);
      }
    });
  }

  convertFnFor(name) {
    return this.customConvertFnFor(name) || this.builtInConvertFnFor(name);
  }

  customConvertFnFor(name) {
    const typeConvertMap = this.typeConfig.convert || {};
    return typeConvertMap[name];
  }

  builtInConvertFnFor(name) {
    return this.constraintsProcessor.process(name);
  }

  get constraintsProcessor() {
    const Clazz = this.constraintsMap[this.type].Processor;
    return new Clazz(this.handler, this.opts);
  }

  rebindMethods() {
    // rebind: ensure this always mapped correctly no matter context
    this.rebind("addConstraint", "addValueConstraint");
  }

  convert() {
    this.rebindMethods();
    this.addMappedConstraints();
    this.convertEnabled();
    return this;
  }

  addMappedConstraints() {
    this.constraintsAdder.addMappedConstraints();
  }

  createConstraintsAdder(opts) {
    return new this.classMap.ConstraintsAdder(this.handler, opts);
  }
}
