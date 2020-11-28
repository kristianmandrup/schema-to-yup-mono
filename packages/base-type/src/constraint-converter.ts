import { Base } from "@schema-to-yup/core";

export class ConstraintConverter extends Base {
  handler: any;
  constraintsAdder: any;
  types: any;
  constraintsMap: any;
  ProcessorClazz: any;
  name: string = "";
  typeConfig: any;
  constraintsProcessor: any;

  constructor(handler, propertySchema, config: any = {}) {
    super(propertySchema, config);
    this.handler = handler;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  convert() {
    return this.customConvertFnFor() || this.builtInConvertFnFor();
  }

  customConvertFnFor() {
    const { name } = this;
    const typeConvertMap = this.typeConfig.convert || {};
    return typeConvertMap[name];
  }

  builtInConvertFnFor() {
    const { name } = this;
    return this.constraintsProcessor.process(name);
  }
}
