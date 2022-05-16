import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import LoadingButton from '@mui/lab/LoadingButton';

import { Question } from 'components/Question';

import './Questions.scss';

const listVariants = {
  visible: {
    scale: 1,
  },
  hidden: {
    scale: 0,
  }
}

export function Questions(props) {
  const { questions, getNextQuestion, comeBackAnswer, sendQuestionToServer, request } = props;
  const [showCommit, setShowCommit] = useState(false)
  const [commit, setCommit] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [prevAnswer, setPrevAnswer] = useState('');
  const [log, setLog] = useState([]);

  const handlerNext = () => {
    if (currentAnswer && !currentAnswer.answer.next && commit.length === 0) {
      setShowCommit(true);
      setLog(prevState => {
        return [...prevState, currentAnswer.story]
      })
    } else if (currentAnswer && currentAnswer.answer.next) {
      getNextQuestion(currentAnswer.answer.next);
      setLog(prevState => {
        return [...prevState, currentAnswer.story]
      })
      setPrevAnswer(currentAnswer);
      setCurrentAnswer('')
    } else if (commit.length > 0) {
      setLog(prevState => {
        return [...prevState, { commit: commit.replace(/\n/g, ' ') }]
      })
    }
  }

  useEffect(() => {
    const findCommit = log.find(item => item.commit)
    if (findCommit){
      sendQuestionToServer(log);
    }
  }, [log])

  const handlerBack = () => {
    setLog(prevState => {
      return prevState.slice(0, -1);
    })
    if (!showCommit) {
      setCurrentAnswer(prevAnswer);
      comeBackAnswer();
    } else {
      setShowCommit(false);
      setCommit('');
    }
  }

  return (
    <AnimateSharedLayout>
      {
      questions.length > 0 &&
        <motion.div
          className="questions"
          layout
        >
          <AnimatePresence>
            {
              questions.map((question, idx) =>
                <motion.div
                  className='questions__disabled'
                  key={idx}
                  layout
                  variants={listVariants}
                  initial='hidden'
                  animate='visible'
                  exit={{ x: -1000 }}
                  transition={{ duration: 0.5 }}
                >
                  <Question
                    question={question}
                    index={idx}
                    setCurrentAnswer={setCurrentAnswer}
                  />
                </motion.div>
              )
            }
          </AnimatePresence>
          <AnimatePresence>
            {
              showCommit &&
              <motion.textarea
                className='questions__area'
                cols={30}
                rows={5}
                layout
                variants={listVariants}
                initial='hidden'
                animate='visible'
                exit={{ x: -1000 }}
                transition={{ duration: 0.5 }}
                value={commit}
                onChange={event => setCommit(event.target.value)}
                placeholder='Введите комментарий'
              >

              </motion.textarea>
            }
          </AnimatePresence>
          <div className="questions__footer">
            <LoadingButton
              variant='contained'
              loading={request}
              disabled={questions.length <= 1 && !showCommit}
              onClick={() => handlerBack()}
            >
              назад
            </LoadingButton>
            <LoadingButton
              variant='contained'
              loading={request}
              disabled={!currentAnswer || (showCommit && commit.length === 0)}
              onClick={() => handlerNext()}
            >
              далее
            </LoadingButton>
          </div>
        </motion.div>
      }
    </AnimateSharedLayout>
  )
}