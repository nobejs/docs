# Endpoint

Writing endpoints in Nobe is not just easy, but it's extremely neat too, only thing is that, it's opinionated.

You should write all endpoints in `` 

An usual endpoint has three parts to it:

- HTTP Method
- URI
- Story Name

If you write an endpoint like: `src/endpoints.js`

```
["post", "/customers", "Customers/UserCanCreateCustomer"]
```

- HTTP Method - POST
- URI - "/customers"
- Story Name - "Customers/UserCanCreateCustomer"

Apart from that, you can write APIs generally, you can refer to https://www.fastify.io/docs/latest/Routes/ for more options.