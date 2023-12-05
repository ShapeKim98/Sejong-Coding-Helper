import React from 'react';
import StreakInfo from './StreakInfo';

const StreakIcon = ( info:
  {isHovering: boolean, 
  streak: StreakInfo, 
  onMouseEnter: () => void, 
  onMouseOut: () => void}) => {
  return (
    <rect
      width="18"
      height="18"
      x={info.streak.x}
      y={info.streak.y}
      rx="5"
      fill={
        info.streak.solved ? 
        (info.streak.isFreeze ? 'var(--color-toggle)' : 'var(--color-checked)') : 'var(--color-unchecked)'
      }
      strokeWidth="2.5"
      stroke={info.isHovering ? '#000000' : 'transparent'}
      onMouseEnter={info.onMouseEnter}
      onMouseOut={info.onMouseOut}
    />
  );
};

export default StreakIcon;
