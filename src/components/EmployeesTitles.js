import React, { PropTypes } from 'react';

export default function EmployeesTitles({ employeeCat_centers }) {
  return (
    <g className="employeeTitles">
      {
        Object.keys(employeeCat_centers).map(employee =>
          <text
            key={employee}
            x={employeeCat_centers[employee].x}
            y={50}
            fontSize="16"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {
              employee
            }
          </text>)
      }
    </g>
  )
}

EmployeesTitles.propTypes = {
  employeeCat_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
