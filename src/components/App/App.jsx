import React, { Component } from "react";

import { Linear } from 'components/Linear';
import { Questions } from 'components/Questions';

import './App.scss';

export class App extends Component {
  state = {
    loading: true,
    error: false,
    session: '',
    questions: [],
    log: []
  }
  componentDidMount() {
    this.setState({ session: 1 });
    this.setState(prevState => ({
      questions: [...prevState.questions, {
        question: {
          "UID": 1,
          "message": "Что Вы хотите сделать"
        },
        answers: [
          {
            "next": null,
            "message": "Пожаловаться на дубль"
          },
          {
            "next": null,
            "message": "Сменить ответственного"
          },
          {
            "next": null,
            "message": "Сменить статус"
          }
        ]
      }]
    }))
    
    this.setState({ loading: false });
  }

  render() {
    return (
      <>
        {
          this.state.loading ?
            <Linear /> :
            <>
              {
                this.state.error ?
                  <div>error</div> :
                <Questions
                  questions={this.state.questions}
                />
              }
            </>
        }
      </>
    )
  }
}