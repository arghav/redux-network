# Redux Network Middleware

[![Build Status](https://travis-ci.org/arghav/redux-network.svg?branch=master)](https://travis-ci.org/arghav/redux-network) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Installation

`npm install redux-network`

# Usage

```
// @flow
import { applyMiddleware, compose, createStore, type Store } from 'redux';
import loggerMiddleware from 'redux-logger';
import type { FluxStandardAction } from 'flux-standard-action';

import networkMiddleware from 'redux-network';

import rootReducer from './reducers';
import type { State } from './types';

export default function configureStore(preloadedState?: State) {
  const middlewares = [networkMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const composedEnhancers = compose(...enhancers);

  const store: Store<State, FluxStandardAction<string, any, any>> =
    createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
```

Once setup any action that contains an instance of `Request` object as the `payload` will be managed by the network middleware.

```
  fetchDataRequest: (): FetchDataRequestAction => ({
    type: ActionTypes.FETCH_DATA_REQUEST,
    payload: new Request(API_URL),
    meta: {
      onResponse: async (response: Response, dispatch: Dispatch) => {
        if (response.ok) {
          const payload = await response.json();

          dispatch(actionCreators.fetchDataSuccess(payload));
        }
      },
      onError: (error: Error, dispatch: Dispatch) => {
        dispatch(actionCreators.fetchDataError(error));
      },
    },
  }),
```

# License

MIT © Amal Raghav
