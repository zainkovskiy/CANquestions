import React, { Component } from "react";
import axios from "axios";

import { Linear } from 'components/Linear';
import { Error } from 'components/Error';
import { Success } from 'components/Success';
import { Questions } from 'components/Questions';
import { Header } from 'components/Header';
import { Title } from 'components/Title';

import './App.scss';

export class App extends Component {
  state = {
    loading: true,
    error: false,
    success: false,
    request: false,
    session: '',
    questions: [],
  }

  getNextQuestion = async (nextUID) => {
    this.setState({ request: true });
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Questions/Controller.php', {
        sessionId: this.state.session,
        action: 'get',
        UID: nextUID,
        userId: userId,
        reqNumber: reqNumber,
      })
      if (res.statusText === 'OK') {
        this.setState(prevState => ({
          questions: [...prevState.questions, {
            question: res.data.question,
            answers: res.data.answers
          }]
        }))
        this.setState({ request: false });
      }
    } catch {
      this.setState({ error: true })
    }
  }

  comeBackAnswer = () => {
    this.setState(prevState => ({
      questions: prevState.questions.slice(0, -1)
    }))
  }

  startSession = async () => {
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Questions/Controller.php', {
        userId: userId,
        action: 'new',
        UID: action,
        reqNumber: reqNumber,
      })
      if (res.statusText === 'OK') {
        this.setState({ session: res.data.sessionId })
        this.setState({
          questions: [{
            question: res.data.question,
            answers: res.data.answers
          }]
        })
      }
    } catch {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false });
    }
  }

  sendQuestionToServer = async (log) => {
    this.setState({ loading: true });
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Questions/Controller.php', {
        userId: userId,
        action: 'commit',
        sessionId: this.state.session,
        reqNumber: reqNumber,
        source: source,
        log: log
      })
      if (res.statusText === 'OK') {
        this.setState({ success: true });
      }
    } catch {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.startSession();
  }

  render() {
    return (
      <>
        {
          this.state.loading ?
            <Linear /> :
            <>
              {
                this.state.error || this.state.success ?
                  <>
                    {
                      this.state.error ?
                        <Error url={'https://crm.centralnoe.ru/dealincom/assets/img/error.jpg'} /> :
                        <Success url={'https://crm.centralnoe.ru/dealincom/assets/img/success-icon.png'} />
                    }
                  </> :
                  <>
                    <Header />
                    <Title />
                    <Questions
                      questions={this.state.questions}
                      request={this.state.request}
                      comeBackAnswer={this.comeBackAnswer}
                      getNextQuestion={this.getNextQuestion}
                      sendQuestionToServer={this.sendQuestionToServer}
                    />
                  </>
              }
            </>
        }
      </>
    )
  }
}