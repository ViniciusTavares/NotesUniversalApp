/** @module shell/AppFooter */

import React, {Component} from 'react';

export default class AppFooter extends Component {
  render() {
    return (
      <footer>
        <div className="row expanded">
          <div className="small-12 text-center columns callout">
            <p>
              Notes's is app to showcase live comunnication working together with REST service operations.
              It was build through React, Redux, ExpressJS, Mongoose, React-Router, Socket.io and others frameworks.
              <br />
              See more details on its <a href="https://github.com/ViniciusTavares/LiveListWithReactAndFirebase"  target="_blank"> Github page </a>!
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
