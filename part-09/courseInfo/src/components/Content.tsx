import { CoursePart } from "../utils/types"
import Part from "./Part"

interface ContentProps {
    courseParts: CoursePart[]
}


const Content = ({courseParts}: ContentProps) => {

    return (
        <div>
            {courseParts.map(((course: CoursePart)=> <Part course={course}/>))}
        </div>
    )   
}

export default Content