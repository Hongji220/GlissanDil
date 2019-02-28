import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import { connect } from "react-redux";
import { newQuestion } from "../../../actions/questionAction";
import classnames from "classnames";
import isEmpty from "../../../validation/is-empty";

class AddMult extends Component {
  state = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    errors: {},
    submitted: false
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newQ = {
      question: this.state.question,
      option1: this.state.option1,
      option2: this.state.option2,
      option3: this.state.option3,
      option4: this.state.option4,
      answer: this.state.answer
    };
    this.props.newQuestion(newQ);
    this.setState({ submitted: true });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      // <!-- Multiple Q Sub -->
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="lead text-center">Add question</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Question"
                  name="question"
                  value={this.state.question}
                  onChange={this.onChange}
                  error={errors.question}
                />
                <hr />
                <small className="form-text text-muted">Answers:</small>
                <TextFieldGroup
                  placeholder="Option One"
                  name="option1"
                  value={this.state.option1}
                  onChange={this.onChange}
                  error={errors.option1}
                />
                <TextFieldGroup
                  placeholder="Option Two"
                  name="option2"
                  value={this.state.option2}
                  onChange={this.onChange}
                  error={errors.option2}
                />
                <TextFieldGroup
                  placeholder="Option Three"
                  name="option3"
                  value={this.state.option3}
                  onChange={this.onChange}
                  error={errors.option3}
                />
                <TextFieldGroup
                  placeholder="Option Four"
                  name="option4"
                  value={this.state.option4}
                  onChange={this.onChange}
                  error={errors.option4}
                />
                <hr />
                <small className="form-text text-muted">Answer :</small>
                <select
                  className={classnames(
                    "custom-select mr-sm-2 form-control form-control-lg",
                    {
                      "is-invalid": errors.answer
                    }
                  )}
                  name="answer"
                  value={this.state.answer}
                  onChange={this.onChange}
                >
                  <option disabled defaultValue value="">
                    Choose...
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                </select>
                {errors.answer && (
                  <div className="invalid-feedback">{errors.answer}</div>
                )}
                {isEmpty(this.state.errors) && this.state.submitted ? (
                  <small className="lead text-muted text-center">
                    Sucessfully Submitted
                  </small>
                ) : (
                  <p />
                )}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => ({
  success: state.success,
  errors: state.errors
});

export default connect(
  mapPropsToState,
  { newQuestion }
)(AddMult);
