import { defaults } from "./defaults";
import { Loggable } from "./loggable";
import { typeMatcher } from "./type-matcher";

export class Base extends Loggable {
  config: any;
  classMap: any;
  propertySchema: any;

  constructor(propertySchema, config: any = {}) {
    super(config);
    this.propertySchema = propertySchema;
    config = config || {};
    const schemaType = config.schemaType || "json-schema";
    const $defaults = defaults[schemaType];
    this.config = { ...$defaults, ...config };
  }

  setClassMap(defaults) {
    const { config } = this;
    this.classMap = {
      ...defaults.classMap,
      ...(config.classMap || {}),
    };
  }

  rebind(...methods) {
    methods.map((name) => {
      const method = this[name];
      this[name] = typeMatcher.isFunctionType(method)
        ? method.bind(this)
        : method;
    });
  }
}
