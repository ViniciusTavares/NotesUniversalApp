/** @module route/Routes */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from '../home/Home'
import Layout from '../shell/Layout'
import NotFoundPage from '../404/NotFoundPage'
import NoteContainer from '../notes/containers/NoteContainer'

const routes = (
  // <Route path="/" component={Layout}>
  //   <IndexRoute component={Home} />
  //   <Route path="notes" component={NotePage}>
  //     <Route path="detail/:id" component={NoteDetail}/>
  //   </Route>
  //   <Route path="*" component={NotFoundPage}/>
  //</Route>
   <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="notes" component={NoteContainer}>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
)

export default routes
