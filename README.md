react-quiz-wizard is a react component that gives handy access to quiz data
combined with wizard. Behind the scenes it uses context api, so data can be accessed
at any level in component tree. Most basic hooks are useQuiz and useStepper.

## Install

```sh
npm i react-quiz-wizard
```

## Features

<ul>
<li>Ready to use quiz builder with stepper component</li>
<li>Multi language</li>
<li>Supports multi choice</li>
<li>Report generation</li>
</ul>

## Quick Start

Wrap your app inside **QuizProvider**. (It asks for questions array to initialize with.)
and don't forget to import css file.

```jsx
import React from "react";
import { QuizProvider } from "react-quiz-stepper";
import "react-quiz-stepper/dist/index.css";

const questions = [];

function App() {
  return (
    <QuizProvider questions={questions}>
      {/* rest of your code here */}
    </QuizProvider>
  );
}
export default App;
```

Now create your Stepper component and put it inside QuizProvider.

```jsx
import React from 'react';
import { Stepper, useQuiz } from 'react-quiz-stepper';

function QuizStepperDemo () {
  const { state } = useQuiz();

  return (
    <Stepper>
      {state.questions.map((question) => ...)}
      {
        /**
        * map through all questions and render
        * appropriate input
        * (multi choice or single choice based on question.type)
        * only one question will be active depending on the step value
        */
      }
    </Stepper>
  )
}

export default App
```

## Using useQuiz

```js
const { state, dispatch, getQuestion, getSavedAnswer, generateReport } =
  useQuiz();
```

| Name           |            Type             | Description                                                                     |
| -------------- | :-------------------------: | :------------------------------------------------------------------------------ |
| state          |          QuizState          | contains user info, user inputs and questions data.                             |
| dispatch       | React.Dispatch<QuizActions> | saveUser: (payload: User) => void <br> saveQuestionAnswer: (payload: UserInput) |
| getSavedAnswer |            func             | (questionId) => number or number[] or ""                                        |
| getQuestion    |            func             | (questionId: number) => SimplifiedQuestion                                      |
| generateReport |            func             | () => ReportState                                                               |

## Using useStepper

```js
const { step, handleNext, handleBack, goToStep, isLastStep } = useStepper();
```

| Name       |     Type     | Description                                                      |
| ---------- | :----------: | :--------------------------------------------------------------- |
| step       |    number    | Index of the active question.                                    |
| handleNext | VoidFunction | Renders next question on screen.                                 |
| handleBack | VoidFunction | Renders previous question on screen.                             |
| goToStep   |     func     | (index: number) => void <br> goes to specific question provided. |
| isLastStep |   boolean    | checks if it is a last step.                                     |

It is possible to bind **handleBack and handleNext** to on click event, to go to next previous and next question respectively.
