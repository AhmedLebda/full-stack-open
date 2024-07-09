
interface CoursePart {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    courseParts: CoursePart[]
}


const Content = ({courseParts}: ContentProps) => {

  return (
    <div>
        {courseParts.map(((course: CoursePart)=> <p key={course.name}>{course.name} {course.exerciseCount}</p>))}
    </div>
  )
}

export default Content