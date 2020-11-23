import { Loggable } from "@schema-to-yup/core";

export class BaseTypeConstraintsProcessor extends Loggable {
  handler: any;
  constraintsMap: any;
  factories: any;
  maps: any;
  opts: any;

  constructor(handler, opts: any = {}) {
    super(opts.config);
    this.opts = opts;
    this.handler = handler;
    this.handler.normalize();
  }

  get constraints() {
    return this.handler.constraints;
  }

  init() {
    this.setConstraintsMap();
    this.setFactoriesMap();
  }

  setConstraintsMap() {
    this.constraintsMap = {
      ...this.maps.classMap,
      ...(this.opts.classMap || {}),
    };
  }

  setFactoriesMap() {
    this.factories = {
      ...this.maps.factories,
      ...(this.opts.typeConstraintFactories || {}),
    };
  }

  createTypeConstraintProcessorFor(name) {
    const { fromClass, fromFactory } = this;
    return fromFactory(name) || fromClass(name);
  }

  fromClass(name) {
    const Clazz = this.constraintsMap[name];
    if (!Clazz) return;
    return new Clazz(this.handler, this.opts);
  }

  fromFactory(name) {
    const factory = this.factories[name];
    if (!factory) return;
    return factory(this.handler, this.opts);
  }

  process(name) {
    const processor = this.createTypeConstraintProcessorFor(name);
    processor.process();
  }
}
