import React, { useState, useEffect, useCallback } from 'react';
import { ScrollButton, StreakWrapper } from './style';
import dayjs from 'dayjs';
import StreakIcon from './StreakIcon';
import StreakTooltip from './StreakTooltip';
import StreakInfo from './StreakInfo';
import StreakGrass from '../../models/StreakGress';

interface StreakGrassDict {
  [key: string]: StreakGrass
}

function Streak(
    streak: {
      randomStreak: StreakGrass[],
      maxStreak: number,
      line: number, 
      width: number, 
      height: number
    }) {
  const [hoveringStreakIdx, setHoveringStreakIdx] = useState(-1);
  const [streakList, setStreakList] = useState<StreakInfo[]>([]);
  /**
   * 오늘 날짜에서 i번째 이전 날짜를 반환한다.
   */
  const getPreviousDate = useCallback((i: number) => {
    const today = new Date();
    // 오전 6시 기준으로 오늘이 나뉨. 오전 6시 이전이라면 어제를 오늘로 친다.
    if (today.getHours() < 6) {
      today.setDate(today.getDate() - 1);
    }
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);
    return previousDate;
  }, []);

  useEffect(() => {
    // 스트릭 정보 생성. 스트릭의 날짜를 key값으로 가지는 객체를 생성한다.
    const streakInfo = streak.randomStreak.reduce((result: StreakGrassDict, item) => {
      result[item.date] = item;
      return result;
    }, {});
    // maxStreak 개수 만큼 스트릭을 생성한다.
    // 스트릭 정보에는 날짜, x,y좌표, 그 날짜에 해결했는지 여부가 포함된다.
    setStreakList(
      [...Array(streak.maxStreak)].map((_, i) => {
        const streakDate = dayjs(getPreviousDate(streak.maxStreak - i - 1));
        const formatDate = dayjs(streakDate).format('YYYY-MM-DD');
        const solved = streakInfo.hasOwnProperty(formatDate) && streakInfo[formatDate].grassInfo;
        const isFreeze = solved && streakInfo[formatDate].problemId == 0;

        return {
          date: formatDate,
          x: Math.floor(i / streak.line) * 20 + 1,
          y: (i % streak.line) * 20 + 1,
          solved: solved,
          isFreeze: isFreeze,
        };
      }),
    );
  }, [streak.randomStreak]);

  return (
    <StreakWrapper style={{marginLeft: 'auto'}}>
      <div>
        <svg height={streak.height} width={streak.width} overflow='auto'>
          {streakList.map((streak, i) => (
            <React.Fragment key={`${streak.date}-fragment`}>
              <StreakIcon
                isHovering={hoveringStreakIdx == i}
                streak={streak}
                onMouseEnter={() => {
                  setHoveringStreakIdx(i);
                }}
                onMouseOut={() => {
                  setHoveringStreakIdx(-1);
                }}
              />
            </React.Fragment>
          ))}
          {/* 툴팁 */}
          {hoveringStreakIdx != -1 && (
            <StreakTooltip streak={streakList[hoveringStreakIdx]} />
          )}
        </svg>
      </div>
    </StreakWrapper>
  );
}

export default Streak;
