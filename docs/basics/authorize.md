# Authorize

### About

Though "Authorization" is part of business logic, which can easily be placed in "Handle" phase, PAHR explicitly insists that this should be a different phase because this way developers and product owners won't miss it.

Also, please note that this is not "Authentication". It's assumed that application if needs Authentication, it has already done that via middleware or a global function.

### Input

The input to this function is as usual entire context, but in the sequence of PAHR, the most important input it would need might `prepareResult`

An example of authorize is below:

```js
const authorize = ({ prepareResult }) => {
  if (prepareResult.subscription === 'active') {
    return true;
  }

  throw {
    message: "NotAuthorized",
    statusCode: 403,
  };
};
```