# redux-session-manager

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# Installation
```bash
npm i -S redux-session-manager
```

# Usage
Create a persistent store by enhancing createStore
```javascript
import persistState from 'redux-session-manager';
import { createStore, compose } from 'redux';
const createPersistentStore = compose(persistState(options))(createStore);
// Pass along the same arguments you would have to createStore
const store = createPersistentStore(reducers, preloadedState, enhancers);
```

## ImmutableJS
If you are using ImmutableJS via `redux-immutable` for example, just change the import to
```javascript
import persistState from 'redux-session-manager/lib/immutable';
```

## Options
| Property | Type | Required? | Description |
|:---|:---|:---|:---
name | string | yes | This will be the key in sessionStorage for the serialized state |
exclude | array[string\|array] | no | An array containing either a string representing the reducer to exclude, or an array of [reducerName, keyPaths] where keyPaths can be either a string for a direct property of the reducer, or an array representing the keyPath to the property to be excluded.

## Serialized only parts of State
Use the exclude option to specify which properties you do not want to serialize to the store

[build-badge]: https://img.shields.io/travis/ssilve1989/redux-session-manager.svg
[build]: https://travis-ci.org/ssilve1989/redux-session-manager

[npm-badge]: https://img.shields.io/npm/v/redux-session-manager.svg
[npm]: https://www.npmjs.org/package/redux-session-manager

[coveralls-badge]: https://img.shields.io/coveralls/ssilve1989/redux-session-manager/master.svg
[coveralls]: https://coveralls.io/github/ssilve1989/redux-session-manager
