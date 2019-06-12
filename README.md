# redux-session-manager

[![Greenkeeper badge](https://badges.greenkeeper.io/ssilve1989/redux-session-manager.svg)](https://greenkeeper.io/)

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
const store = createPersistentStore(reducers, preloadedState);
```

## Applying enhancers
To apply enhancers, like applyMiddlware, pass it to the left of persistState in compose
```javascript
const persistentStoreWithMiddleware = compose(
	applyMiddleware(...middlware),
	persistState(options)
)(createStore)
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

## Excluding parts of state
Use the exclude option to specify which properties you do not want to serialize to the store

# Example
Here is an example using Redux Dev Tools Extension, redux-thunk, redux-logger;
```javascript
import persistState from 'redux-session-manager';
import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [ thunk, logger ];
const createPersistentStoreWithMiddleware = composeEnhancers(
	applyMiddleware(...middleware),
	persistState({
	    name: "sampleStore"
	})
)(createStore);

const store = createPersistentStoreWithMiddleware(reducers, /* preloadedState */);
```

[build-badge]: https://img.shields.io/travis/ssilve1989/redux-session-manager.svg
[build]: https://travis-ci.org/ssilve1989/redux-session-manager

[npm-badge]: https://img.shields.io/npm/v/redux-session-manager.svg
[npm]: https://www.npmjs.org/package/redux-session-manager

[coveralls-badge]: https://img.shields.io/coveralls/ssilve1989/redux-session-manager/master.svg
[coveralls]: https://coveralls.io/github/ssilve1989/redux-session-manager
