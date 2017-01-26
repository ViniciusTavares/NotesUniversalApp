/** @module home/ProjectDescription */

import React, { Component } from 'react'

export default class ProjectDescription extends Component {
  render() {
      return (
        <div>
          <div className="row column area-title">
            <h3>Project description</h3>
          </div>
          <div className="row column">
            <p>
              Notes is a demo of how to use React, Redux, REST Services, Sockeio.io, Webpack and Universal Javascript together. Its interface is simple and objective, in this moment there're
              only 2 pages, however the most important part of this project is its background development.
            </p>
            <p>
              It contains some modern principles and structures, for instance: Single Page Application, State container and Universal Javascript through server rendering and processing the initial application state.
              Below there is a list with not only the principles, but also the frameworks that have been used here.
            </p>
            <p>
              The whole project has been coded in ES6 ( ES-2015 ), so is necessary to transpile the code. Webpack has chosen to prepare our bundle, executing babel-loader for transpiling the code and setting some enviroment variables.
              I believe it's awesome, working well not only with client bundles, but also server bundles too.
            </p>

            <p>
              Gulp has an import participation, once its is responsible for preparing and executing tasks so,
              there are tasks for bundling (through webpack module), cleaning the build directory, copying static files and watching changes in javascripts files.
            </p>
          </div>
        </div>
      )
  }
}
