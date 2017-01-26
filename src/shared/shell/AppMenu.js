/** @module shell/AppMenu */

import React, {Component} from 'react'
import { Link } from 'react-router'

export default class AppMenu extends Component {
  render() {
    return (
      <div className="custom-menu">
        <ul className="menu align-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><a target="_blank" href="http://github.com">Github</a></li>
        </ul>
      </div>
    )
  }
}
