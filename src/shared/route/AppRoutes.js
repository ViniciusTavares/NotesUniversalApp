/** @module route/AppRoutes */

import React, { Component }  from 'react';
import { Router, Route, browserHistory } from 'react-router';
import routes from './routes'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const AppRoutes = (history) => {
    return (
      <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    )
}

export default AppRoutes
