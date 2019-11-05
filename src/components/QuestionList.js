import React, { Component } from 'react'

export default class QuestionList extends Component {

  constructor(props){
    super(props)
    this.state = {
      answers : this.props.options
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    console.log(e.target)
  }


  render() {
    return (
      <div className="questionBox">
        <div className="question">{this.props.question}</div>
        {
          this.state.answers.map((item,index) => {
            return (
              <button className="answerBtn" key={index} data-id={index} onClick={(e) => {
                this.setState({
                  answers : [item]
                })
                this.props.selected(item)
              } }>{item}</button>
            )
          })
        }
      </div>
    )
  }
}
