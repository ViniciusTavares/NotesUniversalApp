/** @module shell/AppHeader */

import React, {Component} from 'react';

export default class AppHeader extends Component {
  render() {
    return (
      <header>
        <div className="row">
          <div className="column text-center">
            <img src="img/header.png" />
          </div>
        </div>
      </header>
    )
  }
}
