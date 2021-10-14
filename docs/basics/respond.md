# Respond

### About

Respond is the last phase of PAHR. Though the question might arise on why not just we can call it a day with Handle phase, and return it as final result. PAHR introduced Respond, so that there won't be a mistake made of not thinking about it.

APIs are supposed to give output in a consistent manner, as in whole application should stick to a specific standard and format. We can't just return the output of Handle, which actually might contain more data than needed. So, Respond's job is to serialize the output, send only what's needed in formats which are most flexible to frontend applications.

### Example

```js
const respond = ({ handleResult }) => {
  // handleResult might be an object like {email, password, created_at, updated_at}

  return {
      email: handleResult.email,
      last_updated_at: handleResult.updated_at
  };
};
```