interface UserProfile {
    bojHandle: string,
    notionId: string,
    profileImg: string | null,
    tier: number,
    totalSolved: number,
    currentStreak: number,
    currentRandomStreak: number,
    todaySolvedProblemCount: number,
    maxRandomStreak: number
}

export default UserProfile;