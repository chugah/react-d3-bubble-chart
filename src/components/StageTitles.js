import React, { PropTypes } from 'react';

export default function StageTitles({ stage_centers }) {
  return (
    <g className="stageTitles">
      {
        Object.keys(stage_centers).map(stage =>
          <text
            key={stage}
            x={stage_centers[stage].x}
            y={50}
            fontSize="16"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {
              stage
            }
          </text>)
      }
    </g>
  )
}

StageTitles.propTypes = {
  stage_centers: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}