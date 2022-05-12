import React from "react";
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

import './Question.scss';

export function Question(props) {
  const { question, index, setCurrentAnswer } = props;

  return (
    <div className="question">
      <div className="question__header">
        {question.question.message}
      </div>
      <div className="question__body">
        <div>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name={`index${index}`}
          >
            {
              question.answers.map((answer, idx) =>
                <FormControlLabel
                  key={idx}
                  value={idx + 1}
                  control={<Radio />}
                  label={answer.message}
                  onChange={() => setCurrentAnswer(
                    {
                      story: { [question.question.UID]: idx + 1 },
                      answer: answer
                    }
                  )}
                />
              )
            }
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}