import React, { PropTypes } from 'react';

export default function MarketTitles({ market_centers }) {
  return (
    <g className="marketTitles">
      {
        Object.keys(market_centers).map(market =>
          <text
            key={market}
            x={market_centers[market].x}
            y={50}
            fontSize="16"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {
              market
            }
          </text>)
      }
    </g>
  )
}

MarketTitles.propTypes = {
  market_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
