import React, { Component } from "react";

export default class AddExt extends Component {
  render() {
    return (
      // <!-- Add Extended -->
      <div class="register">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <p class="lead text-center">Add question</p>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Question"
                    name="question"
                  />
                </div>
                <hr />
                <small className="form-text text-muted">
                  Keywords: ( Enter with "," separating each entry )
                </small>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Keywords"
                    name="keyword"
                  />
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
