## Complex example

Here a more complete example of the variations currently possible

```json
{
  "title": "Person",
  "description": "A person",
  "type": "object",
  "properties": {
    "name": {
      "description": "Name of the person",
      "type": "string",
      "required": true,
      "matches": "[a-zA-Z- ]+",
      "min": 3,
      "maxLength": 40,
    },
    "age": {
      "description": "Age of person",
      "type": "integer",
      "moreThan": 0,
      "max": 130,
      "default": 32,
      "required": false,
      "nullable": true
    },
    "birthday": {
      "type": "date",
      "min": "1-1-1900",
      "maxDate": "1-1-2015"
    },
    "married": {
      "type": "boolean"
    },
    "boss": {
      "type": "object",
      "noUnknown": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "notOneOf": ["Dr. evil", "bad ass"]
        }
      }
    },
    "colleagues": {
      "type": "array",
      "items": {
        "type": "object",
        "propertyNames": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string"
          }
        }
      }
    },
    "programming": {
        "type": "object",
        "properties": {
          "languages": {
            "type": "array",
            "of": {
              "type": "string",
              "enum": ["javascript", "java", "C#"]
            },
            "min": 1,
            "max": 3
          }
        }
      }
    }
  }
}
```
