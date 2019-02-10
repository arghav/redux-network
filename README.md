## Redux Network Middleware

[![Build Status](https://travis-ci.org/arghav/redux-network.svg?branch=master)](https://travis-ci.org/arghav/redux-network) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Network [middleware](https://redux.js.org/advanced/middleware) for redux.

## Installation

`npm install redux-network-fetch`

## Usage

To enable Redux Network, use [`applyMiddleware()`](https://redux.js.org/api-reference/applymiddleware):

```js
import { createStore, applyMiddleware } from 'redux';
import network from 'redux-network-fetch';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(network)
);
```

Once setup any redux action that is dispatched with an instance of `Request` object as the `payload` will be intercepted by the network middleware.

The network middleware also supports optional thunks `onRequest`, `onResponse` and `onError`. These can be used to either compute the response body or dispatch other actions if required.

```js
  fetchDataRequest: () => ({
    type: ActionTypes.FETCH_DATA_REQUEST,
    payload: new Request("https://api.github.com/search/repositories?q=react"),
    meta: {
      onRequest: (request, dispatch) => {
        // dispatch actions if needed
      },
      onResponse: async (response, dispatch) => {
        if (response.ok) {
          const payload = await response.json();

          dispatch(actionCreators.fetchDataSuccess(payload));
        }
      },
      onError: (error, dispatch) => {
        dispatch(actionCreators.fetchDataError(error));
      },
    },
  }),
```

## License

MIT
