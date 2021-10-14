# Strategies

Out of the box, Nobe comes with two strategies. You can find these two strategies in `config.js`

### What is a Strategy

A Strategy is an order of functions in which a Story is executed. Technically, it's an array of functions:

The following is an example of a Strategy.

```js
const executeStrategy = require("./core/executeStrategy");

global.myStrategy = executeStrategy([
  "function1",
  "function1",
  "function3"
]);
```

What above `myStrategy` suggests is that, whenever myStrategy is executed, the flow should start by calling function1 first, and then function2, and then function3 - All the while passing output of one function to another as context.

If we take example of above implementation for a story called `prepareTea`, you might define it like follows:

```js

// prepareTea.js

const function1 = () => {
    return {"ingredient": ['milk', 'water', 'sugar']}
}

const function2 = () => {
    return {"strength": "strong" }
}

const function3 = async ({ function1Result, function2Result }) => {
    return await makeTea(function1Result, function2Result);
}

module.exports = { function1, function2, function3 };
```

If you noticed above, result of function1 and function2 is passed with a prefix "{functionName}Result", you would execute above strategy by just calling:


```js
myStrategy('prepareTea');
```

You can always add remove functions or add functions as part of execution, you can also add global function, optional functions which should be executed.

### Endpoint Strategy

One of the strategies which come with NobeJS is `endpointStrategy`, which is defined as:

```js
global.endpointStrategy = executeStrategy([
  "prepare",
  "authorize",
  "handle",
  "respond",
]);
```

endpointStrategy is used to exectue an api endpoint. An example of how an endpoint looks like in Nobe is:

```js
endpoints: [
    ["post", "/register", "UserCanRegister"],
],
```

So, when an api endpoint `POST /register` is called, nobe does: `endpointStrategy("UserCanRegister/story.js")` to execute it. And it expects there are four function defined in story.js file.


### Test Strategy

One of the strategies which come with NobeJS is `testStrategy`, which is defined as:

```js
global.endpointStrategy = testStrategy([
  "authorize",
  "handle",
  "respond",
]);
```

testStrategy is used to execute the story without "prepare" phase, the idea behind is that, usually "prepare" is used to read the data from external interface and send it to next phases. And testing is not an external interface, but executed in the same environment the story is written. Where as API endpoint is something which our codebase provides for others to interact with.

### Optional Functions

It's possible that we need some function as part of our strategy which are optional and every story might not implement it, in that case we can add it to strategy with an asterick symbol, a simple example would be:

```js
global.endpointStrategy = executeStrategy([
  "prepare",
  "*augmentPrepare",
  "authorize",
  "handle",
  "respond",
]);
```

### Global Functions

You might have a use-case of calling a function everytime a strategy should be executed, you can do this, but adding a function to `global.js` and just adding to the sequence of strategy functions:


```js
global.endpointStrategy = executeStrategy([
  "callMeEverytime",
  "prepare",
  "authorize",
  "handle",
  "respond",
]);
```

And in global.js:

```js
module.exports = {
  callEverytime: () => {},
};
```