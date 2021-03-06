import { BasePropertyValueResolver } from "./base-property-value-resolver";

export const createSinglePropertyValueResolver = (opts, config) => {
  return new SinglePropertyValueResolver(opts, config);
};

export class SinglePropertyValueResolver extends BasePropertyValueResolver {
  constructor(opts, config) {
    super(opts, config);
  }

  resolve() {
    const { toSingleType, value, resolveTypeHandlers, typeHandlerNames } = this;
    if (Array.isArray(value)) return;
    return toSingleType() || resolveTypeHandlers(typeHandlerNames);
  }

  toSingleType() {
    const toSingleType = this.config.toSingleType;
    if (toSingleType) {
      return toSingleType(this);
    }
  }

  get typeHandlerNames() {
    return this.config.typeHandlerNames || Object.keys(this.types);
  }

  resolveTypeHandlers(typeHandlerNames) {
    const { propertySchema, config, resolveTypeHandler, types } = this;
    let result;
    // iterate all registered type handlers in this.types
    for (let typeName of typeHandlerNames) {
      const typeHandler = types[typeName];
      result = resolveTypeHandler(typeHandler, propertySchema, config);
      if (result) break;
    }
    return result;
  }

  resolveTypeHandler(typeHandler, obj, config) {
    return (
      typeHandler &&
      typeHandler.createTypeHandler &&
      typeHandler.createTypeHandler(obj, config)
    );
  }
}
