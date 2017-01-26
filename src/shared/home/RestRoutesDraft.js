/** @module home/RestRoutesDraft */

import React, {  Component } from 'react'


export default class RestRoutesDraft extends Component {
  render () {
    return (
      <div>
        <div className="row column area-title">
          <h3>Routes Draft</h3>
        </div>
        <div className="row  column">
          <h5>Notes</h5>
        </div>
        <div className="row column small-up-1">
          {listRoutesElement('Notes')}
        </div>
        <div className="row column">
          <h5>Categories</h5>
        </div>
        <div className="row column small-up-1">
          {listRoutesElement('Categories')}
        </div>
      </div>
    )
  }
}

const listRoutesElement = (domain) => {
  let draft = getDraft()
  draft = draft.filter((route) => route.domain === domain)
  let width = 250

  let routesList = (
    draft.map((route, index) =>
    <table className="routes-table unstriped" key={'rest-routes-table-' + index}>
      <tbody>
        <tr>
          <th width={width}>REASON</th>
          <td>{route.reason}</td>
        </tr>
        <tr>
          <th width={width}>METHOD</th>
          <td>{route.method}</td>
        </tr>
        <tr>
          <th width={width}> URL</th>
          <td>{route.url}</td>
        </tr>
        {route.body ? (
          <tr>
            <th width={width}>BODY</th>
            <td>{route.body}</td>
          </tr>) : undefined
        }
        <tr>
          <th width={width}>RESPONSE</th>
          <td>{route.response}</td>
        </tr>
      </tbody>
    </table>
  ))

  return routesList
}

const getDraft = ()  => {
  let draft = []

  draft.push({
    reason: 'Create a note',
    method: 'POST',
    url: '{base}/api/notes',
    body: '{ title, date, body, category ( reference) }',
    response: 'Success: 201. Error: 500',
    domain: 'Notes'
  })

  draft.push({
    reason: 'Update a note',
    method: 'PUT',
    url: '{base}/api/notes',
    body: '{ _id, title, date, body, category ( reference) }',
    response: 'Success: 204. Error: 500',
    domain: 'Notes'
  })

  draft.push({
    reason: 'Retrieve notes',
    method: 'GET',
    url: '{base}/api/notes?page={page}&limit={limit}',
    response: 'Success: 200 with data or 404. Error: 500',
    domain: 'Notes'
  })

  //categories
  draft.push({
    reason: 'Create a category',
    method: 'POST',
    url: '{base}/api/categories',
    body: '{ name }',
    response: 'Success: 201. Error: 500',
    domain: 'Categories'
  })

  draft.push({
    reason: 'Update a category',
    method: 'PUT',
    url: '{base}/api/categories',
    body: '{ _id, name }',
    response: 'Success: 204. Error: 500',
    domain: 'Categories'
  })

  draft.push({
    reason: 'Retrieve categories',
    method: 'GET',
    url: '{base}/api/categories',
    response: 'Success: 200 with data or 404. Error: 500',
    domain: 'Categories'
  })

  return draft
}
