interface SolvedProblem {
    problemId: number,
    title: string,
    tier: number,
    tags: string[],
    language: string,
    point: number
}

export default SolvedProblem;