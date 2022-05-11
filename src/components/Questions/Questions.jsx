import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from 'components/Question';
import { Button } from '@mui/material';

import './Questions.scss';

const listVariants = {
  visible: i => ({
    y: 0,
    transition: {
      duration: 0.5
    }
  }),
  hidden: {
    y: -1000,
  }
}

export function Questions(props) {
  const { questions } = props;
  return (
    <div className="questions">
      {
        questions.map((question, idx) =>
          <motion.div
            key={idx}
            variants={listVariants}
            initial='hidden'
            animate='visible'
            custom={idx}
          >
            <Question
              question={question}
              index={idx}
            />
          </motion.div>
        )
      }
      <div className="questions__footer">
        <Button
          variant='contained'
        >назад</Button>
        <Button
          variant='contained'
        >далее</Button>
      </div>
    </div>
  )
}