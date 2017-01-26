/** @module shell/Layout */

import React, { Component } from 'react';
import { render } from 'react-dom';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppMenu from './AppMenu';

export default class Layout extends Component {
  render() {
    return (
      <div className="app-container">
        <AppMenu />
        <AppHeader />
        <div className="app-content">{this.props.children}</div>
        <AppFooter />
      </div>
    )
  }
}
