const tierClass = ['b', 's', 'g', 'p', 'd', 'r'] as const;

type TierClass = typeof tierClass[number];

const tierMap: Record<TierClass, number> = { b: 0, s: 1, g: 2, p: 3, d: 4, r: 5 };

/**
 * 숫자로 들어오는 티어를 문자열로 변경해서 반환한다. (1 -> b5)
 */
export function numToTierStr(tier: number): string {
  return `${tierClass[Math.floor(tier / 5)]}${5 - (tier % 5)}`;
}

/**
 * 문자열로 들어오는 티어를 숫자로 변경해서 반환한다. (b5 -> 1)
 */
export function tierStrToNum(tier: string): number {
  const tierClassChar = tier[0] as TierClass;
  return tierMap[tierClassChar] * 5 + (5 - parseInt(tier[1]));
}
