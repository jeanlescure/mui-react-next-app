import dynamic from 'next/dynamic';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const configureStore = function configureStore(initialState) {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Turned off for prod
  if (process.env.NODE_ENV !== 'production') {
    // Logging Middleware
    const ReduxLogger = require('redux-logger');
    const logger = ReduxLogger.createLogger({
      level: 'info',
      collapsed: true,
    });
    middleware.push(logger);
  }

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));

  const composeEnhancers = compose;
  const composedEnhancers = composeEnhancers(...enhancers);

  const rootReducer = combineReducers({
    ...reducers,
  });

  // Create Store
  const store = createStore(rootReducer, initialState, composedEnhancers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
