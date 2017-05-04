import React, { PropTypes } from 'react';
import './GroupingPicker.css';

export default class GroupingPicker extends React.Component {
  onBtnClick = (event) => {
    this.props.onChanged(event.target.name)
  }
  render() {
    const { active } = this.props
    return (
      <div className="GroupingPicker">
        <button className={`button ${active === 'all' && 'active'}`} name="all" onClick={this.onBtnClick}>All Companies</button>
        <button className={`button ${active === 'market' && 'active'}`} name="market" onClick={this.onBtnClick}>By Market</button>
        <button className={`button ${active === 'funding' && 'active'}`} name="funding" onClick={this.onBtnClick}>By Funding</button>
        <button className={`button ${active === 'stage' && 'active'}`} name="stage" onClick={this.onBtnClick}>By Stage</button>
        <button className={`button ${active === 'employees' && 'active'}`} name="employees" onClick={this.onBtnClick}>By Number of Employees</button>
      </div>
    )
  }
}

GroupingPicker.propTypes = {
  onChanged: PropTypes.func.isRequired,
  active: PropTypes.oneOf(['all', 'market', 'funding', 'stage', 'employees']).isRequired,
}
