import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtended extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartExtended {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartExtended {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartExtended {
  name: 'Testing';
  length: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseSubmissionLink}
        </p>
      );
    case 'Testing':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.length}
        </p>
      );
  }
};

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <div>
    {courseParts.map((coursePart: CoursePart) => (
      <Part key={coursePart.name} coursePart={coursePart} />
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: 'Testing',
      exerciseCount: 3,
      description: 'Testing the description',
      length: 5
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
