import React, { Component } from 'react';
import './assets/style.css';
import quizService from './quizService/';
import QuestionList from './components/QuestionList';
import Result from './components/Result';

export default class App extends Component {
  state = {
    questionBank : [],
    score : 0,
    responses : 0
  }

  constructor(){
    super()
    this.playAgain = this.playAgain.bind(this)
  }

  getQuestionsFromServer(){
    quizService().then(question =>{
      this.setState({
        questionBank : question
      })
    })
  }

  computeAnswer(answer,correct){
    this.setState({
      responses : this.state.responses + 1
    })
    if(answer === correct){
      this.setState({
        score : this.state.score + 1
      })
    }
  }

  playAgain(){
    this.getQuestionsFromServer();
    this.setState({
      responses : 0,
      score : 0
    })
  }

  componentDidMount(){
    this.getQuestionsFromServer();
  }

  render() {
    return (
      <div className="container">
        <div className="title">Quiz Game</div>
        {
          this.state.responses < 5 ? this.state.questionBank.map((index) => {
            return (
              <QuestionList key={index.questionId} question={index.question} selected={answer => this.computeAnswer(answer,index.correct)} options={index.answers} />
            )
          }) : null
        }
        {
          this.state.responses === 5 ? <Result score={this.state.score} playAgain={this.playAgain} /> : null
        }
      </div>
    )
  }
}
