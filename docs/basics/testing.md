# Testing

Testing is one of the most important aspects of Nobe, to an extent our "First Endpoint" tutorial doesn't even have the aspect of actually checking the API against an actual database. It only uses Jest engine to make it run.

When you create a story, which is an independent folder in itself, we expect you write two types of tests. 

- Handler Testing
- API Testing

### Setup

- After you install a brand new Nobe repo, copy .env.example to .env.jest and configure
- `jest.config.js` it configured to run tests inside `src` folder only 
- `tests` folder contains configuration to make things simpler for you to customize

#### Running

Run all tests:

`yarn test`

Run a single test:

`yarn test -i path-to-dot-spect/filename.spec.js`

### Handler Testing

Usually we create a file called `tests.spec.js` but name which ends with .spec would do, in this type of testing we expect you to first write your authorize and handle functions and call your story like: `testStrategy("StoryName", {prepareResult: {}}`

In testStrategy, the first function which would be called is "authorize". And in endpointStrategy it is "prepare". So, when you finally deploy, the input to "authorize" is coming as "prepareResult", that's the reason, we pass "prepareResult" as input to run testStrategy.

### Endpoint Testing

Usually we create a file called `endpoint.spec.js`

Nobe uses Fastify as http server and fastify comes with "inject" method to simulate an api call. So, an example on how you can write a test would be:

```js
respondResult = await app.inject({
  method: "POST",
  url: "/api_endpoint", // This should be in endpoints.js
  payload,
  headers,
});
```

### Workflow

As part of your regular development we would suggest you to follow an order like follows:

1. Create Story using `yarn nobe:genstory "StoryName"`
2. Create first test in `StoryName/tests.spec.js`
3. Write your A-H-R functions to make the tests pass
4. Write tests in `StoryName/endpoint.spec.js`
5. Write your Prepare function
6. Make the tests pass

If you have covered various scenario like testing your Story against positive and negative inputs, you can be pretty condident and close the story right there.
