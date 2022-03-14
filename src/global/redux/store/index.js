import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer  } from '../combine-reducers';
import { logger } from 'redux-logger';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [logger]
const Store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
));


export default Store