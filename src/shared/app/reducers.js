/** @module app/reducers */

import { combineReducers } from 'redux'
import notes from '../notes/reducer'
import categories from '../categories/reducer'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import {reducer as notifications} from 'react-notification-system-redux'

const combinedReducers =  combineReducers({
   notes,
   categories,
   routing:routerReducer,
   form: formReducer,
   notifications
})

export default combinedReducers
