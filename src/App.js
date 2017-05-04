import React from 'react';
import * as d3 from 'd3';
import './App.css';
import BubbleChart from './components/BubbleChart';
import Bubbles from './components/Bubbles';
import Legend from './components/Legend';
import LegendBubble from './components/LegendBubble';
import MarketTitles from './components/MarketTitles';
import FundingTitles from './components/FundingTitles';
import StageTitles from './components/StageTitles';
import EmployeesTitles from './components/EmployeesTitles';
import GroupingPicker from './components/GroupingPicker';
import { createNodes } from './utils';
import { width, height, center, market_centers, fundingCat_centers, stage_centers, employeeCat_centers } from './constants';

export default class App extends React.Component {
  state = {
    data: [],
    grouping: 'all',
  }

  componentDidMount() {
    d3.csv('data/Bubble.csv', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      this.setState({
        data: createNodes(data),
      })
    })
  }

  onGroupingChanged = (newGrouping) => {
    this.setState({
      grouping: newGrouping,
    })
  }

  render() {
    const { data, grouping } = this.state
    return (
      <div className="App">
        <GroupingPicker onChanged={this.onGroupingChanged} active={grouping} />
        <BubbleChart width={width} height={height}>
          <Bubbles data={data} 
            forceStrength={0.03} 
            center={center} 
            market_centers={market_centers} 
            fundingCat_centers={fundingCat_centers} 
            stage_centers={stage_centers}
            employeeCat_centers={employeeCat_centers}
            groupByMarket={grouping === 'market'} 
            groupByFunding={grouping === 'funding'}
            groupByStage={grouping === 'stage'}
            groupByEmployees={grouping === 'employees'} />
          {
            grouping === 'market' &&
            <MarketTitles width={width} market_centers={market_centers} />
          }
          {
            grouping === 'funding' &&
            <FundingTitles width={width} fundingCat_centers={fundingCat_centers} />
          }
          {
            grouping === 'stage' &&
            <StageTitles width={width} stage_centers={stage_centers} />
          }
          {
            grouping === 'employees' &&
            <EmployeesTitles width={width} employeeCat_centers={employeeCat_centers} />
          }
        </BubbleChart>
        <Legend />
        <LegendBubble />
      </div>
    )
  }
}
