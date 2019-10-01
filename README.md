# @emdc/requester

## Deps

* `@babel/core ^7.5.5`,
* `@babel/plugin-proposal-decorators ^7.6.0`,
* `isomorphic-fetch ^2.2.1`,
* `js-cookie ^2.2.1`,
* `normalize-url ^4.5.0`.

Required config for `@babel/plugin-proposal-decorators`:

```
"plugins": [
  // other plugins
  ["@babel/plugin-proposal-decorators", {"legacy": true}]
]
```

And see official [documentation](https://babeljs.io/docs/en/babel-plugin-proposal-decorators).

## Example in browser

You can see library at work with example. Run command `npm start` and open link `http://localhost:3000/`.

## Simple code example

```js
import Requester from '@emdc/requester';


const tasksClient = new Requester('https://jsonplaceholder.typicode.com/todos');

// Using
tasksClient
  .get('/1')
  .then((resp) => console.log(resp));

// or 

const showTaskById = async (id) => {
  const task = await tasksClient.get(`/${id}`);
  console.log(task);
};

const TASK_ID = 1;
showTaskById(TASK_ID);
```

## Description

### Constructor parameters

* `host`.
* `protocol`. Default is `https`. You can use `Protocol` by import `import {Protocol} from '@emdc/requester';`.
* `timeout`, ms. Default is `10000`.
* `useAuthorization`. Default is `false`. By this params library get token from cookies.

### Methods

* `get(url, query)`.
* `post(url, body = {}, query = {})`.
* `put(url, body = {}, query = {})`.
* `delete(url, query = {})`.

### Properties

* `checkPerformance`, `true/false`. Default value is `false`.
* `checkPerformanceCallback`. You can use cb by template: `(time, requestParameters) => {...}`. Default callback is `() => null`.
