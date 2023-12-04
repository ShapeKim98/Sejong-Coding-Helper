interface Problem {
    problemId: string,
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
    official: boolean
    point: number,
    isSolved: boolean,
    tags: string[]
}

export default Problem