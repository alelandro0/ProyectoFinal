import {combineReducers} from '@reduxjs/toolkit'
import auth from './authReducer'
import alert from './alertReducer'

export default combineReducers({
 auth,
 alert
});
