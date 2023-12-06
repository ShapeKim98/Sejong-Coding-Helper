interface SolvedProblemRecommend {
    problemId: number,
    titleKo: string,
    isSolvable: boolean,
    isPartial: boolean,
    acceptedUserCount: number,
    level: number,
    votedUserCount: number,
    sprout: boolean,
    givesNoRating: boolean,
    isLevelLocked: boolean,
    averageTries: number,
    offical: boolean,
    tags: string[],
    point: number,
    isSolved: boolean
}