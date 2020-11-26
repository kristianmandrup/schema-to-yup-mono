import { BasePropertyValueResolver } from "./base-property-value-resolver";
import { MultiPropertyValueResolver } from "./multi-property-value-resolver";
import { SinglePropertyValueResolver } from "./single-property-value-resolver";

export const createPropertyValueResolver = (opts, config) => {
  return new PropertyValueResolver(opts, config);
};

export class PropertyValueResolver extends BasePropertyValueResolver {
  multiTypeResolver: any;
  singleTypeResolver: any;

  constructor(opts, config) {
    super(opts, config);
    this.initResolvers();
  }

  initResolvers() {
    const { propertySchema, config } = this;
    const createMultiTypeResolverFn =
      config.createMultiTypeResolver || this.createMultiTypeResolver.bind(this);
    this.multiTypeResolver = createMultiTypeResolverFn(propertySchema, config);
    const createSingleTypeResolverFn =
      config.createSingleTypeResolver ||
      this.createSingleTypeResolver.bind(this);
    this.singleTypeResolver = createSingleTypeResolverFn(
      propertySchema,
      config
    );
  }

  createMultiTypeResolver() {
    const { propertySchema, config } = this;
    return new MultiPropertyValueResolver(propertySchema, config);
  }

  createSingleTypeResolver() {
    const { propertySchema, config } = this;
    return new SinglePropertyValueResolver(propertySchema, config);
  }

  resolve() {
    return this.toMultiType() || this.toSingleType() || this.toDefaultEntry();
  }

  toMultiType() {
    const resolve =
      this.config.toMultiType ||
      this.singleTypeResolver.resolve.bind(this.singleTypeResolver);
    return resolve(this);
  }

  toSingleType() {
    const resolve =
      this.config.toSingleType ||
      this.singleTypeResolver.resolve.bind(this.singleTypeResolver);
    return resolve(this);
  }

  toDefaultEntry() {
    return this.defaultType();
  }

  defaultType() {
    this.error("toEntry: unknown type", this.type);
  }
}
