/** @module pagination/Pagination */

import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Pagination extends Component{
  static propTypes = {
    count: React.PropTypes.number.isRequired,
    limit: React.PropTypes.number.isRequired,
    current: React.PropTypes.number.isRequired
  }

  render() {
    let pagesItems = []
    let pages = Math.round(this.props.count / this.props.limit)
    let previous = ''
    let next = ''

    if(this.props.current === 1) {
      previous =   <li className='pagination-previous disabled'>Previous</li>
    } else {
      let url =  `/notes?page=${this.props.current - 1}&limit=${this.props.limit}`
      previous = <li className='pagination-previous'><Link to={url} aria-label="Previous page"> Previous </Link></li>
    }

    if(this.props.current === pages) {
      next =  <li className='pagination-next disabled'>Next</li>
    } else {
      let url =  `/notes?page=${this.props.current + 1}&limit=${this.props.limit}`
      next = <li className='pagination-next'><Link to={url} aria-label="Next page"> Next </Link></li>
    }

    for (var i = 1; i <= pages; i++) {
      let key = `pagination-items-key-${i}`
      let url = `/notes?page=${i}&limit=${this.props.limit}`
      let liClass =i === this.props.current ? 'custom-current' : ''

      if(i === this.props.current) {
        pagesItems.push(
          <li className={liClass} key={key}>
            <span>{i}</span>
          </li>
        )
      } else {
        let aria  = `Go to page ${i}`
        pagesItems.push(
          <li className={liClass} key={key}>
            <Link to={url} aria-label={aria}>{i}</Link>
          </li>
        )}
      }

      return (
        <div className="row">
          <div className="small-12">
            <ul className="pagination text-center" role="navigation" aria-label="Pagination">
              {previous}
              {pagesItems}
              {next}
            </ul>
          </div>
        </div>
      )
    }
  }
