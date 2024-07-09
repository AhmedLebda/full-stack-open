interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
interface CoursePartDetailed extends CoursePartBase {
    description: string;
}
interface CoursePartBasic extends CoursePartDetailed {
    kind: "basic";
}
interface CoursePartGroup extends CoursePartBase {
    kind: "group";
    groupProjectCount: number;
}
interface CoursePartBackground extends CoursePartDetailed {
    kind: "background";
    backgroundMaterial: string;
}
interface CoursePartSpecial extends CoursePartDetailed {
    kind: "special";
    requirements: string[];
}

export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;
