import React, { Component } from "react";
import {
  getQuestion,
  saveScore,
  resetQuiz
} from "../../../actions/questionAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../../validation/is-empty";
import Spinner from "../../common/Spinner";

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      attempts: 0,
      saved: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question) {
      this.setState({ question: nextProps.question.question });
    }
  }
  componentWillMount() {
    this.props.getQuestion();
  }
  componentDidMount() {
    if (isEmpty(this.props.question)) {
      const currentQs = this.props.question;
      console.log(currentQs);
    }
  }
  onClick = e => {
    this.props.getQuestion();
  };

  getRandomQ(currentQs) {
    const question = currentQs[Math.floor(Math.random() * currentQs.length)];
    return question;
  }

  checkScore = e => {
    this.setState({ attempts: this.state.attempts + 1 });
    e.preventDefault();
    if (e.target.name.toString() === this.state.question.answer.toString()) {
      this.setState({ score: this.state.score + 1 }, () => {
        this.props.getQuestion();
      });
    } else {
      e.target.className = "bg-danger btn p-4 ml-auto text-white m-2";
    }
  };

  saveScore = e => {
    e.preventDefault();
    this.props.saveScore({
      qtype: "multiple",
      total: this.state.score
        ? Math.round((this.state.score / this.state.attempts) * 100).toString()
        : "0"
    });
  };

  restart = e => {
    this.setState({ score: 0, attempts: 0 });
    this.props.resetQuiz();
    this.props.getQuestion();
  };

  render() {
    const { loading } = this.props.question;
    let content;
    if (loading || isEmpty(this.props.question.question)) {
      content = <Spinner />;
    } else {
      let question = {
        question: this.props.question.question.question,
        answers: this.props.question.question.answers,
        answer: this.props.question.question.answer
      };
      const { user } = this.props.auth;
      content = (
        <div>
          <h1>{question.question}</h1>
          <div className="container answers">
            <button
              name="1"
              className="bg-info btn p-4 ml-auto text-white m-2"
              onClick={this.checkScore}
            >
              {question.answers[0].option1}
            </button>
            <button
              name="2"
              className="bg-info btn p-4 ml-auto text-white m-2"
              onClick={this.checkScore}
            >
              {question.answers[0].option2}
            </button>
            <button
              name="3"
              className="bg-info btn p-4 ml-auto text-white m-2"
              onClick={this.checkScore}
            >
              {question.answers[0].option3}
            </button>
            <button
              name="4"
              className="bg-info btn p-4 ml-auto text-white m-2"
              onClick={this.checkScore}
            >
              {question.answers[0].option4}
            </button>
          </div>

          <button
            className="bg-info btn p-2 ml-auto text-white m-2"
            onClick={this.onClick}
          >
            Next Question
          </button>
          <div>
            <p>
              Your Current Score: {this.state.score}
              <br />
              Your Total Attempts: {this.state.attempts}
            </p>
          </div>
          {!isEmpty(user.name) ? (
            <button
              className="bg-info btn p-2 ml-auto text-white m-2"
              onClick={this.saveScore}
            >
              End Quiz
            </button>
          ) : (
            <p className="lead text-muted">Log in to save your scores</p>
          )}
        </div>
      );
    }
    return (
      <div className="container text-center justify-content-center">
        {!this.props.saved ? (
          content
        ) : (
          <div>
            <button onClick={this.restart} className="btn-info btn p-4 m-auto">
              Start Quiz
            </button>{" "}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  question: state.question,
  saved: state.question.saved,
  auth: state.auth
});

Multiple.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  saveScore: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getQuestion, saveScore, resetQuiz }
)(Multiple);
