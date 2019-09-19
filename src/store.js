import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducer from './reducers';


const middleware = applyMiddleware();


export default createStore(reducer, middleware);