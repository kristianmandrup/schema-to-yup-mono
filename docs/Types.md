# Types

You can choose to use the built in type handlers or use one or more your own, including any customizations. You can also easily extend and override the built-in type handlers.

Currently the following schema types are supported:

- `array` (partly)
- `boolean`
- `date`
- `number`
- `object`
- `string`

### Mixed (any type)

- `strict`
- `default`
- `nullable`
- `required`
- `notRequired`
- `oneOf` (`enum`, `anyOf`)
- `notOneOf`
- `when` _NEW_
- `isType` _NEW_
- `nullable` (`isNullable`) _NEW_

### Array

- `ensure`
- `compact`
- `items` (`of`)
- `maxItems` (`max`)
- `minItems` (`min`)
- `itemsOf` (`of`) _NEW_ partly/experimental support (needs more <3 <3)

### Boolean

No keys

### Date

- `maxDate` (`max`)
- `minDate` (`min`)

### Number

- `integer`
- `moreThan` (`exclusiveMinimum`)
- `lessThan` (`exclusiveMaximum`)
- `positive`
- `negative`
- `min` (`minimum`)
- `max` (`maximum`)
- `truncate`
- `round`

### Object

- `camelCase`
- `constantCase`
- `noUnknown` (`propertyNames`)

### String

- `minLength` (`min`)
- `maxLength` (`max`)
- `pattern` (`matches` or `regex`)
- `email` (`format: 'email'`)
- `url` (`format: 'url'`)
- `lowercase`
- `uppercase`
- `trim`

For pattern (RegExp) you can additionally provide a flags property, such as `flags: 'i'`.
Will be converted to a regexp using `new RegExp(pattern, flags)`

## Multi-type constraints

This library currently does not come with built-in support for multi valued (list/array) type constraints such as `['string', 'null']`

See [Issue 52](https://github.com/kristianmandrup/schema-to-yup/issues/52#issuecomment-561720235) for a discussion and current state.

To support this, you can either add your own logic for the `toMultiType` function/method of `YupSchemaEntry` or pass a custom factory method `createMultiTypeValueResolver` on the `config` object.

Sample code for multi type support (untested):

```js
export const createPropertyValueHandler = (opts, config) => {
  return new PropertyValueResolver(opts, config);
};

export class MyMultiTypeValueResolver extends MultiTypeValueResolver {
  constructor(opts, config) {
    this.propertyHandler = createPropertyValueHandler(opts, config);
  }

  resolve() {
    const { value, name } = this;
    let constraintListValue = this.normalizeValue(value); // ['string', 'null']
    const multiTypePropSchema = constraintListValue.reduce(
      (accSchema, constraintValue) => {
        return this.resolvePropertyValue(constraintValue, accSchema);
      },
      null
    );

    return yup.mixed().test({
      name,
      exclusive: true,
      params: {},
      message: "${path} does not conform to all constraints defined",
      test: (val) => {
        return multiTypePropSchema.validateSync(val);
      },
    });
  }

  resolvePropertyValue(constraintValue, accSchema) {
    const opts = {
      ...this.opts,
      constraintValue,
    };
    return this.propertyHandler.resolve(opts, this.config);
  }

  // expand/normalize to list of objects each with a valid type entry
  normalizeList(multiTypeList) {
    return multiTypeList.reduce((acc, entry) => {
      acc.push(normalizedEntry);
      return acc;
    }, []);
  }

  normalizeTypeEntry(entry) {
    if (!this.isStringType(entry)) return entry;
    return { type: entry };
  }
}
```

### Custom type handlers

You can pass any custom typehandlers in a `typeHandlers` object as part of the `config` object passes. See `setTypeHandlers()` in `entry.js` for how this works internally.

```js
function myCustomStringHandler = (obj, config) => {
  // ... custom handler
  // return yup type schema such as yup.string()
  // with one or more constraints added
}

const yupSchema = buildYup(jsonSchema, {
  typeHandlers: {
    string: myCustomStringHandler
  },
});
```

This can be used to support special cases, to circumvent a bug or unexpected/unwarranted behaviour for one or more of the built-in type handlers etc.
You can then use the built in classes as building blocks.

To control which constraints are enabled (executed), simply edit the `typeEnabled` getter on your type handler class. Here is the default `typeEnabled` getter for the `YupDate` (Date) type handler, which is configured to execute constraint handler functions: `minDate` and `maxDate`.

```js
  get typeEnabled() {
    return ["minDate", "maxDate"];
  }
```

This can also be used to add custom handlers as described in the next section.

### Custom constraint handler functions

You can also add custom custraint handler functions directly via the `config` object as follows:
This can be used to override built in constraints or extend with your own.

A custom handler to validate a string formatted as a valid `ip` address might look something like this (presuming such a method is available on `yup` string). You can also use this with [yup schema type extensions](https://github.com/jquense/yup#extending-schema-types).

```js
// takes the typehandler (such as YupString) instance as argument
const ipHandler = (th) => {
  const constraintName = th.constraintNameFor("ip", "format");
  const method = "ip";
  th.addConstraint("ip", {
    constraintValue: true,
    constraintName,
    method,
    errName: method,
  });
};

const config = {
  string: {
    convert: {
      ip: ipHandler,
    },
    enabled: [
      "ip", // custom
      // built in
      "normalize",
      "minLength",
      "maxLength",
      "pattern",
      "lowercase",
      "uppercase",
      "email",
      "url",
      "genericFormat",
    ],
  },
  // ... more configuration
};

buildYup(jsonSchema, config);
```

Instead of using enabled with the full list, you can also use `extends`

```js
const config = {
  string: {
    convert: {
      ip: ipHandler,
    },
    extends: [
      // custom additions
      "ip",
      // built in handlers all included automatically
    ],
  },
};
```

Note that if `convert` has entries and `extends` for the type configuration is not set (and no `enabled` list of constraints defined either) it will use all the entries in `convert` by default (ie. `extends` set to all keys).

We welcome feedback on how to better structure the `config` object to make it easy and intuitive to add run-time configuration to suit your needs.

## Additional properties

Currently this library does not have built-in support for the `additionalProperties` feature of JSON schema as described [here](https://json-schema.org/understanding-json-schema/reference/object.html)

```js
{
  "type": "object",
  "properties": {
    "number":      { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "type": "string",
                     "enum": ["Street", "Avenue", "Boulevard"]
                   }
  },
  "additionalProperties": { "type": "string" }
}
```

See [issue 55](https://github.com/kristianmandrup/schema-to-yup/issues/55#issuecomment-561127144)

Yup does not directly support this, so it would require some "hacking" to make it work.

You can extend `YupBuilder` to include custom logic to support `additionalProperties`

```js
class YupBuilderWithSupportForAdditionalProperties extends YupBuilder {
  additionalPropsToShape(opts, shape) {
    // do your magic here using this.additionalProps
    // make new yup constraint function calls on the incoming yup shape object
    return shape;
  }
}
```

See the issue for ideas and hints on how to achieve support for this.
