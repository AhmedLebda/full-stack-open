import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseParts, courseName } from "./data/courseData";

const App = () => {
    const totalExercises = courseParts.reduce(
        (sum, part) => sum + part.exerciseCount,
        0
    );

    return (
        <div>
            <Header text={courseName} />
            <Content courseParts={courseParts} />
            <Total total={totalExercises} />
        </div>
    );
};

export default App;
