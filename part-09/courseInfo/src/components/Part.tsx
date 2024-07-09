import { CoursePart } from "../utils/types";

interface PartProps {
    course: CoursePart;
}

const Part = ({ course }: PartProps) => {
    let renderedCourse = null;

    switch (course.kind) {
        case "basic":
            renderedCourse = (
                <div>
                    <p>
                        {course.name} - {course.exerciseCount} -{" "}
                        {course.description}
                    </p>
                </div>
            );
            break;
        case "group":
            renderedCourse = (
                <div>
                    <p>
                        {course.name} - {course.exerciseCount} -{" "}
                        {course.groupProjectCount}
                    </p>
                </div>
            );
            break;
        case "background":
            renderedCourse = (
                <div>
                    <p>
                        name: {course.name} - {course.exerciseCount} -{" "}
                        {course.description} - {course.backgroundMaterial}
                    </p>
                </div>
            );
            break;
        case "special":
            renderedCourse = (
                <div>
                    <p>
                        name: {course.name} - {course.exerciseCount} -{" "}
                        {course.description} - {course.requirements.join(" - ")}
                    </p>
                </div>
            );
            break;
        default:
            renderedCourse = null;
    }

    return <div>{renderedCourse}</div>;
};

export default Part;
