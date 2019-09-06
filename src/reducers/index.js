import { combineReducers } from 'redux';

import { userReducer as user } from './userReducer';
import test from './testReducer';


export default combineReducers({
    user,
    test
});