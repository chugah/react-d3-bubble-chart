import React, { PropTypes } from 'react';

export default function FundingTitles({ fundingCat_centers }) {
  return (
    <g className="fundingTitles">
      {
        Object.keys(fundingCat_centers).map(funding =>
          <text
            key={funding}
            x={fundingCat_centers[funding].x}
            y={50}
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {
              funding 
            }
          </text>)
      }
    </g>
  )
}

FundingTitles.propTypes = {
  fundingCat_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
