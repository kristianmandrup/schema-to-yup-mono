# Customization options

You can supply a `createYupSchemaEntry` function as an entry in the `config` object.
This function will then be used to build each Yup Schema entry in the Yup Schema being built.

Use the Yup Type classes such as `types.YupArray` to act as building blocks or create your own custom logic as you see fit.

## Custom entry builders

You can pass in custom functions for the following kinds of type entry values

- object value, such as `{type: 'string'}`
- list value, such as `["string", "integer"]`

The custom functions are:

- `toSingleType(yupSchemaEntryBuilder)`
- `toMultiType(yupSchemaEntryBuilder)`

Each takes an instance `yupSchemaEntryBuilder` of `YupSchemaEntry`, which primarily holds the following properties of interest, that you can leverage in your custom handler logic

```js
{
  schema, key, name, value, type, obj, config;
}
```

### Custom constraint builder

This library supports using a custom constraint builder to add and build constraints. All factories are initialised in `initHelpers` and executed as the first step of `convert` (see `mixed.js`)

```js
import { ConstraintBuilder } from "schema-to-yup";

class MyConstraintBuilder extends ConstraintBuilder {
  constructor(typeHandler, opts = {}) {
    super(typeHandler, opts);
    // custom instance configuration
  }

  build(propName, opts) {
    /// custom build logic

    // returns new type validation handler (base) with built constraint added
    return newBase;
  }

  addConstraint(propName, opts) {
    // custom add constraint logic
    return this.typeHandler;
  }

  // custom event handler
  onConstraintAdded({ name, value }) {
    // ...
    return this.typeHandler;
  }
}
```

To use a custom constraint builder we recommend subclassing the `ConstraintBuilder` class that comes with the library. Then create a factory method thart can instanciate it.

```js
const createConstraintBuilder = (typeHandler, config) => {
  return new MyConstraintBuilder(typeHandler, config);
};

const config = {
  createConstraintBuilder,
  // ... more configuration
};

buildYup(jsonSchema, config);
```

## Custom logs and error handling

You can enable logging py passing a `log` option in the `config` argument. If set to true, it will by default assign the internal log function to `console.log`

```js
const schema = buildYup(nameJsonSchema, { log: true });
```

You can also pass a log function in the `log` option to handle log messages and an `err` option with a custom error handler function.

See [Custom errors in Node](https://rclayton.silvrback.com/custom-errors-in-node-js) for how to design custom errors

```js
class ValidationError extends Error {}

const schema = buildYup(nameJsonSchema, {
  log: (name, msg) => console.log(`[${name}] ${msg}`)
  err: (msg) => {
    console.error(`[${name}] ERROR: ${msg}`
    throw new ValidationError(msg)
  })
});
```

### Customization example

```js
const { YupSchemaEntry, buildYup, types } = require("schema-to-yup");

class CustomYupArray extends types.YupArray {
  // ...
}

class CustomYupSchemaEntry extends YupSchemaEntry {
  // ...
}

function createYupSchemaEntry(key, value, config) {
  const builder = new CustomYupSchemaEntryBuilder(key, value, config);
  builder.types.array = (config) => createYupArray(config);
  return builder.toEntry();
}

// use some localized error messages
const messages = i18n.locale(LOCALE);

const yupSchema = buildYup(json, {
  createYupSchemaEntry,
  messages,
});
```

### Extend Yup API to bridge other validators

You can use `extendYupApi` to extend the Yup API with extra validation methods:

```js
const validator = require("validator");
const { extendYupApi } = require("schema-to-yup/validator-bridge");

// by default extends with string format validation methods of validator
// See https://www.npmjs.com/package/validator
extendYupApi({ validator });
```

You can optionally pass in a custom `validator` and a constraints map of your choice.
You can either extend the default constraints or override them with your own map.

PS: Check out `src/validator-bridge` for more many options for fine control

```js
const myValidator = new MyValidator();
const constraints = ["creditCard", "currency", { name: "hash", opts: "algo" }];
extendYupApi({ validator: myValidator, override: true, constraints });

const { buildYup } = require("schema-to-yup");
// type def sample schema, using credit-card format validator
const schema = {
  name: "BankAccount",
  fields: {
    accountNumber: {
      type: "String",
      format: "credit-card",
    },
  },
};

// opt in to use generic string format validation, via format: true config option
const yupSchema = buildYup(schema, { format: true, schemaType: "type-def" });
// ...do your validation
const valid = await yupSchema.isValid({
  accountNumber: "123-4567-1828-2929",
});
```

Now the bridge includes tests and seems to work ;)

### Subclassing

You can sublass `YupBuilder` or any of the internal classes to create your own custom infrastructure to suit your particular needs, extend with extra features etc.

```js
const { YupBuilder } = require("schema-to-yup");

class MyYupBuilder extends YupBuilder {
  // ... custom overrides etc
}

const builder = new MyYupBuilder(schema, config);
const { yupSchema } = builder;
// ...
```

### Error messages

You can pass an `errMessages` object in the optional `config` object argument with key mappings for your custom validation error messages.

Internally the validator error messages are resolved via an instance of the `ErrorMessageHandler` calling the `valErrMessage` method.

```js
  notOneOf() {
    const {not, notOneOf} = this.value
    const $oneOf = notOneOf || (not && (not.enum || not.oneOf))
    $oneOf && this
      .base
      .notOneOf($oneOf, this.valErrMessage('notOneOf'))
    return this
  }
```

#### Use a custom error message handler

We recommend you subclass the existing `ErrorMessageHandler` as follow

```js
import { ErrorMessageHandler } from "schema-to-yup";

class MyErrorMessageHandler extends ErrorMessageHandler {
  // ...
}

const createErrorMessageHandler = (typeHandler, config = {}) => {
  return new MyErrorMessageHandler(typeHandler, config);
};
```

You could f.ex override `errMessageFor` as follows, using the `type`

```js
  errMessageFor(name) {
    return this.propertyErrMessageFor(name) || this.genericErrMessageFor(name)
  }

  propertyErrMessageFor(name) {
    const { errMessages, key } = this;
    const errMsg = errMessages[key];
    if (!errMsg) return
    return errMsg[name]
  }

  genericErrMessageFor(name) {
    const { errMessages, type } = this;
    const genricErrMsgMap = errMessages['_generic_'];
    const fullName = `${type}.${name}`
    return genricErrMsgMap[fullName] || genricErrMsgMap[name];
  }
```

Then pass in your factory function in `config` as follows.

```js
const config = {
  createErrorMessageHandler,
};
```

You can pass the `errMessages` as follows. Note that you can define error messages specific to a property such as `emailAdr.format` and generic messages prefixed with `$` such as `$email`.
Note: This convention might well change in future releases.

```js
let config = {
  errMessages: {
    emailAdr: {
      // note: would also work with email as the key
      format: "emailAdr must be a valid email",
    },
    // generic fallback message for any email format validation
    // note: if not present uses yup default validation message
    $email: "Email format incorrect",
  },
};
```

The key entries can be either a function, taking a `value` argument or a static string.
Here are some of the defaults that you can override as needed.

```js
export const errValKeys = [
  "oneOf",
  "enum",
  "required",
  "notRequired",
  "minDate",
  "min",
  "maxDate",
  "max",
  "trim",
  "lowercase",
  "uppercase",
  "email",
  "url",
  "minLength",
  "maxLength",
  "pattern",
  "matches",
  "regex",
  "integer",
  "positive",
  "minimum",
  "maximum",
];

export const defaults = {
  errMessages: (keys = errValKeys) =>
    keys.reduce((acc, key) => {
      const fn = ({ key, value }) =>
        `${key}: invalid for ${value.name || value.title}`;
      acc[key] = fn;
      return acc;
    }, {}),
};
```

### Custom validation messages using select defaults

```js
const { buildYup, types } = require("schema-to-yup");
const { defaults } = types;

const myErrMessages = require("./err-messages");
const valKeys = ["lowercase", "integer"];

// by default Yup built-in validation error messages will be used if not overridden here
const errMessages = {
  ...defaults.errMessages(valKeys),
  myErrMessages,
};

const yupSchema = buildYup(json, {
  errMessages,
});
```

## Adding custom constraints

See the `number` type for the current best practice to add type constraints.

For simple cases: use `addConstraint` from the superclass `YupMixed`

```js
  required() {
    return this.addConstraint("required");
  }
```

For types with several of these, we should map through a list or map to add them all.

```js
  strict() {
    return this.addValueConstraint("strict");
  }

  required() {
    return this.addConstraint("required");
  }

  notRequired() {
    return this.addConstraint("notRequired");
  }
```

Can be rewritten to use conventions, iterating a map:

```js
  addMappedConstraints() {
    Object.keys(this.constraintsMap).map(key => {
      const list = constraintsMap[key];
      const fnName = key === 'value' ? 'addValueConstraint' : 'addConstraint'
      list.map(this.[fnName]);
    });
  }

  get constraintsMap() {
    return {
      simple: ["required", "notRequired", "nullable"],
      value: ["default", "strict"]
    };
  }
```

For more complex contraints that:

- have multiple valid constraint names
- require validation
- optional transformation

You can create a separate `Constraint` subclass, to offload and handle it all separately.
Here is a sample `RangeConstraint` used by number.

```js
class RangeConstraint extends NumericConstraint {
  constructor(typer) {
    super(typer);
  }

  get $map() {
    return {
      moreThan: ["exclusiveMinimum", "moreThan"],
      lessThan: ["exclusiveMaximum", "lessThan"],
      max: ["maximum", "max"],
      min: ["minimum", "min"],
    };
  }
}
```

Instead of wrapping a `Constraint` you can call it directly with a `map`

```js
// this would be an instance such as YupNumber
// map equivalent to $map in the RangeConstraint
range() {
  return createNumericConstraint(this, map);
}
```

For the core type constraint class (such as `YupNumber`) you should now be able to simplify it to:

```js
  get enabled() {
    return ["range", "posNeg", "integer"];
  }

  convert() {
    this.enabled.map(name => this.processConstraint(name));
    super.convert();
    return this;
  }
```

The following constraint classes are available for use:

- `NumericConstraint`
- `StringConstraint`
- `RegExpConstraint`
- `DateConstraint`

Currently only `YupNumber` has been (partly) refactored to take advantage of this new infrastructure. Please help refactor the rest!

`YupNumber` also has the most unit test coverage, used to test the current infrastructure!
