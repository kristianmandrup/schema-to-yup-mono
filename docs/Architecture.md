# Architecture

## packages

- `builder` - main builder logic
- `core` core functionality, such as logging
- `types` exports all the built-in type handlers

### Type handlers

- `array-type`
- `boolean-type`
- `date-type`
- `mixed-type`
- `number-type`
- `object-type`
- `string-type`

Each of these types inherit from `BaseType` in the `base-type` package.

### Type handler helpers

- `conditions` - handles schema conditionals such as `when`, and `if`
- `constraints` - basic constraint logic

### Miscellaneus

- `validator-bridge` bridges validator

### Tests

- `tests` tests

## Builder

- `buildSchema(schema: any, config = {})`
- `createBuilder(config = {})`
- `SchemaBuilder`

The builder iterates on the `properties` of the main/object schema and processes each property.

### Schema entries

For each entry `createSchemaEntry` is called to with the value of that property.

- `createSchemaEntry(opts = {})`

This creates a `SchemaEntry` instance which calls `createPropertyValueHandler(opts, config)` to create a property value handler by way of the `typeHandlers` registered (either passed in via the config or using a built-in type handler).

### Property resolvers

A property can either be a single property value (object) or a list of properties (array).

For each property valie, `createPropertyValueResolver` is called to create a `PropertyValueResolver` instance. This instance then determines how to process the property value based on the type (single value vs array/multi value)

For a single (object) property value, `createSinglePropertyValueResolver` is called to create an instance of `SinglePropertyValueResolver`.

For an multi (array) property value, `createMultiPropertyValueResolver` is called to create an instance of `MultiPropertyValueResolver`.

Note: Currently this library does not support resolving a multi (array) property value, but the infrastructure is in place so you can customize/extend it to suit your needs.

The `SinglePropertyValueResolver` instance calls `resolveTypeHandlers(typeHandlerNames)` with a list of `typeHandlerNames` to process for. It iterates on all the `typeHandlerNames` and for each name creates a `typeHandler` looking it up in the `types` object passed in.

As soon as a `typeHandler` resolves a result, the iteration is aborted. The resolution is responsible for updating the output instance accordingly.

```ts
for (let typeName of typeHandlerNames) {
  const typeHandler = types[typeName];
  result = resolveTypeHandler(typeHandler, obj, config);
  if (result) break;
}
```

Note that each typehandler is resolved via a call to `createTypeHandler`:

```ts
typeHandler.createTypeHandler(obj, config);
```

## TypeHandler

Any `TypeHandler` should export a factory method `createTypeHandler` which should be used to create any instance of the `TypeHandler`.

The factory method should guard creation by testing if the incoming property value (`obj`) is non-empty and creating an instance of a type `Guard`.

The guard should determine if the property value object is valid to be used for the particular `TypeHandler`. If the value is valid, an instance of the `TypeHandler` should be created, taking the property value `obj` and the `config` as input.

Every `TypeHandler` should inherit from `BaseType` which implements core type handler functionality.

The `BaseType` class uses composition to leverage a number of helpers:

- `typeErrorHandler`
- `typeModeSelector`
- `typeValueProcessor`
- `mixed`
- `converter`
- `constraintsProcessor`
- `constraintsAdder`

A developer can pass in custom versions of any of these helpers, allowing for great flexibility.

The core helper is the `converter` which is responsible for converting the property value to a type output that can be added to the builder schema output.

The `converter` should implement `convert` to do the job, leveraging the `mixed` instance (instance of the `mixed` type `TypeHandler`).

The `convert` strategy is as follows:

- convert the enabled constraints for the mixed type
- convert the enabled constraints for the type being processed (such as `string`, `array` etc)

```ts
this.convertMixed();
this.convertEnabled();
```

### typeValueProcessor

The `typeValueProcessor` helper is responsible for pre-processing the property value before being converted. It does this simply through the `value` setter.

Note: Currently the `typeValueProcessor` is not integrated in the converter.

### constraintBuilder

The `constraintBuilder` helper is responsible for builder type constraints via the `constraintsAdder` helper.

### constraintsAdder

The `constraintsAdder` helper is responsible for adding a type constraint, such as `email` for a `string`

### typeErrorHandler

The `typeErrorHandler` helper is responsible for handling errors in the `TypeHandler` instance or any of its helpers.

### typeModeSelector

The `typeModeSelector` helper is responsible for handling runtime modes.
Currently only the required/not-required mode is supported, see [Mode](../Readme.md#Mode).

### BaseTypeConstraintsProcessor

The `BaseTypeConstraintsProcessor` is the base class for the `Processor` class of each type, which is responsible for processing all the constraints supported for that type.

For each constraint, a factory method is called to create a `Constraint` instance such as `MaxItems` for the `array` type.

Each `Constraint` class should inherit from `BaseTypeConstrain` and have a `process` method which processes the constraint (building the type handler output for the particular property constraint definition).

A `yup` type schema instance is built using method chaining. To facilitate chaining, use the built-in `chain` method, such as `this.chain((x) => $max && x.max($max));` used in `MaxItems`.

The `Constraint` class can leverage helpers such as those found in the `constraints` package. Conditional constraints (such as `when`) can be found in the `conditions` package.
