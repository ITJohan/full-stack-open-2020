import React from "react";
import ReactDOM from "react-dom";

interface CoursePart {
  name: string,
  exerciseCount: number
};

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <div>
    {courseParts.map((coursePart: CoursePart) => (
      <p key={coursePart.name}>
        {coursePart.name} {coursePart.exerciseCount}
      </p>
    ))}
  </div>
);

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <p>
    Number of exercises{' '}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
