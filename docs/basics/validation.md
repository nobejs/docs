# Validation

### About

As part of culture to scale, we suggest that a team should master a tool or invent tools, and follow them consistently. This helps increase productivity a lot.

As part of that, we heavily use https://validatejs.org/

### Basics

Nobejs comes with a function to execute validatejs library, an example would give better clarity:

```js
const validator = requireValidator();


const validateInput = async (prepareResult) => {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: "^Please enter name",
      },
    },
    slug: {
      presence: {
        allowEmpty: false,
        message: "^Please enter slug",
      },
      type: "string",
      custom_callback: {
        message: "Slug should be unique",
        callback: async (payload) => {
          let count =
            typeof payload.slug === "string"
              ? await TeamRepo.countAll({
                  slug: prepareResult.slug
                })
              : -1;
          return count === 0 ? true : false;
        },
      },
    },
  };

  return validator(prepareResult, constraints);
};
```

#### validator

validator is a custom function which is written as wrapper over validatejs, which executes validation and also modifies error messages to be more readable and consistent across platform.

In above example, we pass constraints and payload. If the payload is not passing the validation, you would get an error similar to following:

```
{
    "message": "Validation failed. 3 error(s)",
    "errorCode": "InputNotValid",
    "errors": {
        "name": [
            "Please enter name"
        ],
        "slug": [
            "Please enter slug",
            "Slug should be unique"
        ]
    }
}
```

#### custom_callback

Custom callback is an custom validator which comes with Nobe, to facilitate any kind of async validations too. If the function returns false, it means validation is not successful.

In above example, we are insisting that slug should be unique, so we are checking the count and deciding true/false

### Customize

You can write your own validator and use anytime, but if you want to use same convention, you can change the function used in `config.js`, just change the following item:

```
validator: "./core/validator",
```