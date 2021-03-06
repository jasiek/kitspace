'use strict'
const React = require('react')
const LazyLoad = require('../lazy_load')
const {Icon} = require('semantic-ui-react')

var BoardShowcase = React.createClass({
  getInitialState: function() {
    return {
      viewFrontBoard: true
    }
  },
  frontBoardView: function(e) {
    e.preventDefault()
    this.setState({
      viewFrontBoard: true
    })
  },
  backBoardView: function(e) {
    e.preventDefault()
    this.setState({
      viewFrontBoard: false
    })
  },
  render: function() {
    var frontBoardClass = 'frontBoard boardDiagram '
    var backBoardClass = 'backBoard boardDiagram '
    const zipUrl = this.props.zipUrl
    if (this.state.viewFrontBoard) {
      frontBoardClass += ' selectedBoard'
    } else {
      backBoardClass += ' selectedBoard'
    }
    const children = this.props.children || [<div />, <div />]
    const TraceSpaceLink = props =>
      zipUrl ? (
        <a
          className="traceSpaceLink"
          href={`https://tracespace.io/view/?boardUrl=${zipUrl}`}
          target="_blank"
          title="Click to inspect the Gerber files on Tracespace"
        >
          {props.children}
        </a>
      ) : (
        <div>{props.children}</div>
      )
    return (
      <div className="boardShowcaseContainer">
        <div className="toggleBoardView responsiveTabs">
          <button
            disabled={this.state.viewFrontBoard}
            className="circuitToggleBtn circuitFrontBtn"
            onClick={this.frontBoardView}
          >
            Front
          </button>
          <button
            disabled={!this.state.viewFrontBoard}
            className="circuitToggleBtn circuitBackBtn"
            onClick={this.backBoardView}
          >
            Back
          </button>
        </div>
        <TraceSpaceLink>
          <div className="boardShowcase">
            <LazyLoad
              once={true}
              component={React.createElement('div', {className: 'img'})}
              distance={300}
            >
              <div className="boardContainer">
                <div className={frontBoardClass}>{children[0]}</div>
                <div className="circuitBorderContainer">
                  <div className="circuitBorder" />
                </div>
                <div className={backBoardClass}>{children[1]}</div>
              </div>
            </LazyLoad>
            <div className="overlay">
              <div className="shadow" />
              <p>
                <svg
                  id="traceSpaceLogo"
                  viewBox="0 0 36 36"
                  height="18"
                  style={{paddingLeft: 10}}
                >
                  <path d="M22 14H36V0H16L0 16V36H14V22L22 14Z M36 28C36 32.4183 32.4183 36 28 36C23.5817 36 20 32.4183 20 28C20 23.5817 23.5817 20 28 20C32.4183 20 36 23.5817 36 28Z" />
                </svg>
              </p>
            </div>
          </div>
        </TraceSpaceLink>
      </div>
    )
  }
})

module.exports = BoardShowcase
