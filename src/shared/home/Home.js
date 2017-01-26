/** @module home/Home */

import React, { Component } from 'react';
import RestRoutesDraft from './RestRoutesDraft'
import ProjectDescription from './ProjectDescription'
import Tools from './Tools'
import PatternsAndPrinciples from './PatternsAndPrinciples'
import Roadmap from './Roadmap'

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <ProjectDescription />
        <PatternsAndPrinciples />
        <Tools />
        <Roadmap />
        <RestRoutesDraft />
      </div>
    )
  }
}
