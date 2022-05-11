import React from "react";
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import './Question.scss';

export function Question(props) {
  const { question, index, setCurrentAnswer } = props;

  return (
    <AnimatePresence initial={false}>
      <motion.div className="question"
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
      >
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
                    onChange={() => setCurrentAnswer(question.question.UID, idx + 1, answer)}
                  />
                )
              }
            </RadioGroup>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}