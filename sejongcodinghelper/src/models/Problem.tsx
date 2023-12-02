import Tag from "./Tag"

interface Problem {
    titleKo: string,
    isSolvable: boolean,
    level: number,
    problemId: string,
    tags: Tag[]
}

export default Problem