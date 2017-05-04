import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import { fillColor } from '../utils';
import tooltip from './Tooltip';

export default class Bubbles extends Component {
  constructor(props) {
    super(props)
    const { forceStrength, center } = props
    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .on('tick', this.ticked.bind(this))
      .stop()
  }

  state = {
    g: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data)
    }
    if (nextProps.groupByMarket !== this.props.groupByMarket) {
      this.regroupBubblesOne(nextProps.groupByMarket)
    }
    if (nextProps.groupByFunding !== this.props.groupByFunding) {
      this.regroupBubblesTwo(nextProps.groupByFunding)
    }
    if (nextProps.groupByStage !== this.props.groupByStage) {
      this.regroupBubblesThree(nextProps.groupByStage)
    }
    if (nextProps.groupByEmployees !== this.props.groupByEmployees) {
      this.regroupBubblesFour(nextProps.groupByEmployees)
    }
  }

  shouldComponentUpdate() {
    // we will handle moving the nodes on our own with d3.js
    // make React ignore this component
    return false
  }

  onRef = (ref) => {
    this.setState({ g: d3.select(ref) }, () => this.renderBubbles(this.props.data))
  }

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius ** 2.0)
  }

  regroupBubblesOne = (groupByMarket) => {
    const { forceStrength, market_centers, center } = this.props
    if (groupByMarket) {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => market_centers[d.market].x))
                      .force('y', d3.forceY().strength(forceStrength).y(d => market_centers[d.market].y))
    } else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                      .force('y', d3.forceY().strength(forceStrength).y(center.y))
    }
    this.simulation.alpha(1).restart()
  }

  regroupBubblesTwo = (groupByFunding) => {
    const { forceStrength, fundingCat_centers, center } = this.props
    if (groupByFunding) {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => fundingCat_centers[d.fundCat].x))
                      .force('y', d3.forceY().strength(forceStrength).y(d => fundingCat_centers[d.fundCat].y))
    } else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                      .force('y', d3.forceY().strength(forceStrength).y(center.y))
    }
    this.simulation.alpha(1).restart()
  }

  regroupBubblesThree = (groupByStage) => {
    const { forceStrength, stage_centers, center } = this.props
    if (groupByStage) {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => stage_centers[d.stage].x))
                      .force('y', d3.forceY().strength(forceStrength).y(d => stage_centers[d.stage].y))
    } else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                      .force('y', d3.forceY().strength(forceStrength).y(center.y))
    }
    this.simulation.alpha(1).restart()
  }

  regroupBubblesFour = (groupByEmployees) => {
    const { forceStrength, employeeCat_centers, center } = this.props
    if (groupByEmployees) {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => employeeCat_centers[d.employees].x))
                      .force('y', d3.forceY().strength(forceStrength).y(d => employeeCat_centers[d.employees].y))
    } else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                      .force('y', d3.forceY().strength(forceStrength).y(center.y))
    }
    this.simulation.alpha(1).restart()
  }

  renderBubbles(data) {
    const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id)

    // Exit
    bubbles.exit().remove()

    // Enter
    const bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => fillColor(d.genCat))
      .attr('stroke', d => d3.rgb(fillColor(d.genCat)).darker())
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)  // eslint-disable-line
      .on('mouseout', hideDetail) // eslint-disable-line

    bubblesE.transition().duration(2000).attr('r', d => d.radius).on('end', () => {
      this.simulation.nodes(data)
      .alpha(1)
      .restart()
    })
  }
  render() {
    return (
        <g ref={this.onRef} className="bubbles" />
    )
  }
}

Bubbles.propTypes = {
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  forceStrength: PropTypes.number.isRequired,
  groupByMarket: PropTypes.bool.isRequired,
  market_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  fundingCat_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  stage_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  employeeCat_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
}

/*
* Function called on mouseover to display the
* details of a bubble in the tooltip.
*/
export function showDetail(d) {
    // change outline to indicate hover state.
  d3.select(this).attr('stroke', 'black')

  const content = `<span class="name">Company Name: </span><span class="value">${
                  d.name
                  }</span><br/>` +
                  `<span class="name">Description: </span><span class="value">${
                  d.description
                  }</span><br/>` +
                  `<span class="name">Market: </span><span class="value">${
                  d.market 
                  }</span><br/>` +
                  `<span class="name">Funding: </span><span class="value">${
                  d.value
                  }M</span><br/>` +
                  `<span class="name">Joined: </span><span class="value">${
                  d.date
                  }</span><br/>` +
                  `<span class="name">Stage: </span><span class="value">${
                  d.stage
                  }</span><br/>` +
                  `<span class="name">Employees: </span><span class="value">${
                  d.employees
                  }</span><br/>` +
                  `<span class="name">Stack: </span><span class="value">${
                  d.stack
                  }</span><br/>` +
                  `<span class="name">Category: </span><span class="value">${
                  d.genCat
                  }</span>`

  tooltip.showTooltip(content, d3.event)
}

/*
* Hides tooltip
*/
export function hideDetail(d) {
    // reset outline
  d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker())

  tooltip.hideTooltip()
}
