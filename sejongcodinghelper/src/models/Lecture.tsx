import Tag from "./Tag"

interface Lecture {
    name: string,
    id: number,
    lectureId: string,
    classification: string | null
    tags: Tag[]
}

export default Lecture