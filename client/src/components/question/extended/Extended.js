import React, { Component } from "react";

export default class Extended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          question: "How many in a couple",
          answers: [{ option1: "1", option2: "2", option3: "3", option4: "4" }],
          answer: "2"
        }
      ],
      currentQ: ""
    };
  }

  componentDidMount() {
    const currentQs = this.state.questions;
    this.setState(prevState => {
      console.log(prevState);
      return {
        questions: currentQs,
        currentQ: this.getRandomQ(currentQs)
      };
    });
  }

  getRandomQ(currentQs) {
    const question = currentQs[Math.floor(Math.random() * currentQs.length)];
    return question;
  }

  render() {
    return (
      <div className="container text-center">
        {/* Quiz component */}
        <div className="formgroup">
          <h1>Question</h1>
          <div className="con">
            <label>Answer:</label>
            <textarea className="form-control" rows="5" id="answer" />
          </div>

          <button className="bg-info btn mt-4 text-white " type="submit">
            Submit
          </button>
        </div>
        {/* <Quiz {...this.state} question={this.state.currentQ} /> */}
      </div>
    );
  }
}
